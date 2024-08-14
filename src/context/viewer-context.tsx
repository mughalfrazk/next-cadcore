"use client"

import React, {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

type ViewerContextType = {
  fileName: string;
  buffers: ArrayBuffer | undefined;
  setFileName: Dispatch<SetStateAction<string>>;
  setBuffers: Dispatch<SetStateAction<ArrayBuffer | undefined>>;
};

export const ViewerContext = createContext<ViewerContextType>({
  fileName: "",
  buffers: undefined,
  setFileName: () => {},
  setBuffers: () => {},
});

const ViewerProvider = ({ children }: { children: React.ReactNode }) => {
  const [fileName, setFileName] = useState<string>("");
  const [buffers, setBuffers] = useState<ArrayBuffer | undefined>();

  return (
    <ViewerContext.Provider
      value={{
        fileName,
        buffers,
        setFileName,
        setBuffers,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
};

export default ViewerProvider;
