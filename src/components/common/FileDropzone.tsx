"use client";

import { Group, Text, rem, useMantineTheme } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";

type FileDropzoneProps = {} & DropzoneProps;

const FileDropzone = ({ onDrop, ...otherProps }: FileDropzoneProps) => {
  const theme = useMantineTheme();

  return (
    <Dropzone
      radius={theme.defaultRadius}
      onDrop={onDrop}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={5 * 3024 ** 2}
      multiple
      accept={{
        "model/gltf+json": [".gltf"],
        "model/gltf-binary": [".glb"],
        "application/zip": [".zip"],
      }}
      {...otherProps}
    >
      <Group justify="center" gap="xl" style={{ pointerEvents: "none" }}>
        <Dropzone.Accept>
          <IconUpload
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-blue-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-red-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-dimmed)",
            }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag and Drop zipped or direct either .glb or .gltf files.
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 30MB
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};

export default FileDropzone;
