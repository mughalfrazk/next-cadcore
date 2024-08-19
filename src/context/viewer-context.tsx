"use client";

import React, {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import * as THREE from "three";
import { KTXLoader } from "three-stdlib";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

import { ThreeConfigModel } from "@/lib/models/Three";

type ViewerContextType = {
  scene: any;
  fileName: string;
  buffers: Map<string, ArrayBuffer> | undefined;
  setScene: Dispatch<SetStateAction<any>>;
  setFileName: Dispatch<SetStateAction<string>>;
  setBuffers: Dispatch<SetStateAction<Map<string, ArrayBuffer> | undefined>>;
  generateScene: (config: ThreeConfigModel) => void;
};

export const ViewerContext = createContext<ViewerContextType>({
  scene: undefined,
  fileName: "",
  buffers: undefined,
  setScene: () => {},
  setFileName: () => {},
  setBuffers: () => {},
  generateScene: () => {},
});

const ViewerProvider = ({ children }: { children: React.ReactNode }) => {
  const [scene, setScene] = useState(null);
  const [fileName, setFileName] = useState<string>("");
  const [buffers, setBuffers] = useState<
    Map<string, ArrayBuffer> | undefined
  >();

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
      const loader = new THREE.TextureLoader();
      const backgroundTexture = loader.load("https://i.imgur.com/upWSJlY.jpg");

      result.scene.background = backgroundTexture;
      setScene(result.scene);
    }
  };

  return (
    <ViewerContext.Provider
      value={{
        fileName,
        buffers,
        scene,
        setScene,
        setFileName,
        setBuffers,
        generateScene,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
};

export default ViewerProvider;
