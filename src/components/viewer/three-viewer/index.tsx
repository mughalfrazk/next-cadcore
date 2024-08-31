"use client";

import { useContext, useEffect, useState } from "react";
import JSZip from "jszip";

import { getFileDetailByPathApi } from "@/lib/supabase/client/storage";
import { isGlb, isGltf, isZip } from "@/utils/isExtension";

import { useViewerContext } from "@/context/viewer-context";
import CanvasWrapper from "./CanvasWrapper";

type ThreeViewerProps = {
  modelPath: string;
};

const ThreeViewer = ({ modelPath }: ThreeViewerProps) => {
  const { buffers, setBuffers, setFileName } = useViewerContext();
  const [noModel, setNoModel] = useState<boolean>(false);

  const loadDownloadedFile = async (path: string) => {
    setNoModel(false);
    try {
      const fileName = path.split("/")[1];
      const result = await getFileDetailByPathApi(path);
      if (!result) return setNoModel(true);

      const buffers: any = new Map();
      buffers.set(fileName, result);

      for (const [path, buffer] of buffers.entries()) {
        if (isZip(path)) {
          const { files } = await JSZip.loadAsync(buffer);
          for (const [path, file] of Object.entries(files)) {
            const buffer = await file.async("arraybuffer");
            buffers.set(path, buffer);
          }
          buffers.delete(path);
        }
      }

      const filePath = Array.from(buffers.keys()).find(
        (path) => isGlb(path as string) || isGltf(path as string)
      ) as string;

      setBuffers(buffers);
      setFileName(filePath);
    } catch (error) {
      console.log("Catched error");
      console.log(error);
    }
  };

  useEffect(() => {
    if (modelPath) loadDownloadedFile(modelPath);

    return () => {
      setBuffers(undefined);
      setFileName("");
    };
  }, [modelPath]);

  return noModel ? "No Model to Load..." : buffers && <CanvasWrapper />;
};

export default ThreeViewer;
