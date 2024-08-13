"use client";

import React, { useEffect } from "react";
import Viewer from "./viewer";
import { Box } from "@mantine/core";
import { ThreeConfigModel } from "@/lib/models/Three";

const Result = ({ scene, generateScene }) => {
  const config: ThreeConfigModel = {
    types: false,
    shadows: true,
    instance: false,
    instanceall: false,
    verbose: false,
    keepnames: false,
    keepgroups: false,
    meta: false,
    precision: 3,
    pathPrefix: "",
  };

  useEffect(() => {
    generateScene(config);
  }, []);

  return !scene ? (
    <p>Loading ...</p>
  ) : (
    <Box h={"100%"}>
      {scene && (
        <Viewer
          scene={scene}
          shadows={true}
          contactShadow={true}
          autoRotate={true}
          environment="city"
          preset="rembrandt"
          intensity={1.0}
        />
      )}
    </Box>
  );
};

export default Result;
