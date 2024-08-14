"use client";

import React, { useEffect } from "react";
import { IconArrowsMaximize, IconArrowsMinimize } from "@tabler/icons-react";
import { Box, Group, Loader, rem } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";

import { ThreeConfigModel } from "@/lib/models/Three";
import { useZIndex } from "@/hooks/use-z-index";
import CButton from "../core/CButton";
import Viewer from "./viewer";

const Result = ({ scene, generateScene }: any) => {
  const z = useZIndex();
  const { ref, toggle, fullscreen } = useFullscreen();

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

  return (
    <Group
      ref={ref}
      bg={"white"}
      justify="center"
      align="center"
      w={"100%"}
      style={{ position: "relative", zIndex: z.base }}
    >
      <CButton
        isIconOnly={true}
        style={{ position: "absolute", zIndex: z.popover, top: 20, right: 20 }}
        onClick={toggle}
        px={6}
      >
        {fullscreen ? <IconArrowsMaximize /> : <IconArrowsMinimize />}
      </CButton>
      {!scene ? (
        <Loader />
      ) : (
        <Box w="100%" h="100%">
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
      )}
    </Group>
  );
};

export default Result;
