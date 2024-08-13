"use client";

import { useState } from "react";
import { Box, Group, Text, rem, useMantineTheme } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";

import CButton from "../core/CButton";
import { uploadFileApi } from "@/lib/supabase/files";
import { ProfileModel } from "@/lib/models/Profile";

type FileFormFields = "files";

export interface FileFormDataPayload extends FormData {
  append(
    name: FileFormFields,
    value: string | Blob | FileWithPath[],
    fileName?: string
  ): void;
}

type FileUploadProps = {
  user: ProfileModel;
};

const FileUpload = ({ user }: FileUploadProps) => {
  const theme = useMantineTheme();
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPath[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const uploadHanlder = async () => {
    try {
      setLoading(true);
      if (uploadedFiles?.length) {
        const formData: FileFormDataPayload = new FormData();
        uploadedFiles.forEach((f) => {
          formData.append("files", f);
        });
        const result = await uploadFileApi(user.email, formData);
        console.log(result);
      }
    } catch (error) {
      console.log("catch");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dropzone
        radius={theme.defaultRadius}
        style={{
          border: "1px solid var(--app-shell-border-color)",
        }}
        onDrop={(files) => {
          console.log("accepted files", files);
          setUploadedFiles(files);
        }}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={5 * 3024 ** 2}
        multiple
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
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
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      <Group justify="center" mt={10}>
        <CButton w={200} loading={loading} onClick={uploadHanlder}>
          Upload
        </CButton>
      </Group>
    </>
  );
};

export default FileUpload;
