"use client";

import React, { useContext, useEffect } from "react";
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconChevronLeft,
} from "@tabler/icons-react";
import { Group, Loader, rem, Text } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";

import { ThreeConfigModel } from "@/lib/models/Three";
import { useZIndex } from "@/hooks/use-z-index";
import CButton from "../../core/CButton";
import Viewer from "./Canvas";
import CadcoreLogo from "../../icons/CadcoreLogo";
import { useRouter } from "next/navigation";
import { ViewerContext } from "@/context/viewer-context";
import Header from "./Header";

const CanvasWrapper = () => {
  const { scene, generateScene } = useContext(ViewerContext);
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
      h="100%"
      style={{ position: "relative", zIndex: z.base }}
    >
      <Header toggle={toggle} fullscreen={fullscreen} />
      {!scene ? (
        <Loader />
      ) : (
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
    </Group>
  );
};

export default CanvasWrapper;
