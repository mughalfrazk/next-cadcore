"use client";

import React, { useEffect } from "react";
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconChevronLeft,
} from "@tabler/icons-react";
import { Group, Loader, rem, Text } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";

import { ThreeConfigModel } from "@/lib/models/Three";
import { useZIndex } from "@/hooks/use-z-index";
import CButton from "../core/CButton";
import Viewer from "./viewer";
import CadcoreLogo from "../icons/CadcoreLogo";
import { useRouter } from "next/navigation";

const Result = ({ scene, generateScene }: any) => {
  const z = useZIndex();
  const router = useRouter()
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

  const goBack = () => {
    router.back()
  }

  useEffect(() => {
    generateScene(config);
  }, []);

  return (
    <Group
      ref={ref}
      bg={"white"}
      justify="center"
      align="center"
      // w={"100%"}
      h="100%"
      style={{ position: "relative", zIndex: z.base }}
    >
      <Group
        justify="space-between"
        align="flex-start"
        style={{
          position: "absolute",
          zIndex: z.popover,
          top: 20,
          right: 20,
          left: 20,
        }}
      >
        {!fullscreen && (
          <CButton
            leftSection={<IconChevronLeft />}
            onClick={goBack}
          >Back</CButton>
        )}
        <Group gap={0} align="flex-start">
          <CadcoreLogo h={55} />
          <Text fw={200} pt={2} style={{ fontSize: rem(30) }} c={"var(--mantine-color-grey-3)"}>
            Studio
          </Text>
        </Group>
        <CButton isIconOnly={true} onClick={toggle} px={6}>
          {fullscreen ? <IconArrowsMinimize /> : <IconArrowsMaximize />}
        </CButton>
      </Group>
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

export default Result;
