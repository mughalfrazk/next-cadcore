"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { KTXLoader } from "three-stdlib";
import JSZip from "jszip";

import { getFileDetailByPathApi } from "@/lib/supabase/client/files";
import { isGlb, isGltf, isZip } from "@/utils/isExtension";
import { ThreeConfigModel } from "@/lib/models/Three";
import Result from "./result";

type ModelViewerProps = {
  modelPath: string
}

const ModelViewer = ({ modelPath }: ModelViewerProps) => {
  const [fileName, setFileName] = useState<string>("");
  const [buffers, setBuffers] = useState<Map<string, ArrayBuffer>>();
  const [scene, setScene] = useState(null);

  const generateScene = async (config: ThreeConfigModel) => {
    const rawFileName = fileName;
    const nameOfFile =
      config.pathPrefix && config.pathPrefix !== ""
        ? `${config.pathPrefix}/${rawFileName}`
        : rawFileName;

    let result: any;
    if (buffers?.size !== 1) {
      const loadingManager = new THREE.LoadingManager();
      const dracoloader = new DRACOLoader().setDecoderPath(
        "https://www.gstatic.com/draco/v1/decoders/"
      );
      const gltfLoader = new GLTFLoader(loadingManager)
        .setDRACOLoader(dracoloader)
        .setMeshoptDecoder(MeshoptDecoder)
        .setKTX2Loader(KTXLoader as any);

      result = await new Promise((resolve, reject) => {
        const objectURLs: string[] = [];

        // return objectUrl blob build from the buffer map
        loadingManager.setURLModifier((path) => {
          const buffer = buffers?.get(path) as BlobPart;

          const url = URL.createObjectURL(new Blob([buffer]));
          objectURLs.push(url);

          return url;
        });

        const gltfBuffer = buffers?.get(nameOfFile) as ArrayBuffer;
        const onLoad = (gltf: any) => {
          // clean up
          objectURLs.forEach(URL.revokeObjectURL);
          loadingManager.setURLModifier =
            THREE.DefaultLoadingManager.setURLModifier;

          resolve(gltf);
        };

        gltfLoader.parse(
          gltfBuffer,
          nameOfFile.slice(0, nameOfFile.lastIndexOf("/") + 1),
          onLoad,
          reject
        );
      });
    } else {
      const dracoloader = new DRACOLoader().setDecoderPath(
        "https://www.gstatic.com/draco/v1/decoders/"
      );
      const gltfLoader = new GLTFLoader()
        .setDRACOLoader(dracoloader)
        .setMeshoptDecoder(MeshoptDecoder)
        .setKTX2Loader(KTXLoader as any);

      result = await new Promise((resolve, reject) =>
        gltfLoader.parse(buffers.entries().next().value[1], "", resolve, reject)
      );
    }

    if (!scene) {
      const loader = new THREE.TextureLoader()
      const backgroundTexture = loader.load("https://i.imgur.com/upWSJlY.jpg")

      result.scene.background = backgroundTexture
      setScene(result.scene)
    };
  };

  const loadDownloadedFile = async (path: string) => {
    try {
      const fileName = path.split("/")[1]
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
      console.log(error)
    }
  };

  useEffect(() => {
    if (modelPath) loadDownloadedFile(modelPath)

    return () => {
      setBuffers(undefined)
      setFileName("")
    }
  }, [modelPath])

  return buffers && <Result scene={scene} generateScene={generateScene} />;
};

export default ModelViewer;
