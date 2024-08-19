"use client";

import { useContext, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { KTXLoader } from "three-stdlib";
import JSZip from "jszip";

import { getFileDetailByPathApi } from "@/lib/supabase/client/files";
import { isGlb, isGltf, isZip } from "@/utils/isExtension";
import { ThreeConfigModel } from "@/lib/models/Three";
import Result from "./CanvasWrapper";
import { ViewerContext } from "@/context/viewer-context";
import CanvasWrapper from "./CanvasWrapper";

type ThreeViewerProps = {
  modelPath: string;
};

const ThreeViewer = ({ modelPath }: ThreeViewerProps) => {
  const { buffers, setBuffers, setFileName } = useContext(ViewerContext);

  const loadDownloadedFile = async (path: string) => {
    try {
      const fileName = path.split("/")[1];
      const result = await getFileDetailByPathApi(path);

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
        (path) => isGlb(path) || isGltf(path)
      ) as string;

      setBuffers(buffers);
      setFileName(filePath);
    } catch (error) {
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

  return buffers && <CanvasWrapper />;
};

export default ThreeViewer;
