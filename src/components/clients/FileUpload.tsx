"use client";

import { useState, Fragment } from "react";
import {
  Box,
  Card,
  Divider,
  Group,
  Progress,
  Stack,
  Text,
  rem,
  useMantineTheme,
} from "@mantine/core";
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
import FileDropzone from "../common/FileDropzone";
import BlueDocuemntIcon from "../icons/BlueDocuemntIcon";
import OrangeDocuemntIcon from "../icons/OrangeDocuemntIcon";

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
        await uploadFileApi(user.email, formData);
        setUploadedFiles([])
      }
    } catch (error) {
      console.log("catch");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card withBorder>
      <FileDropzone
        onDrop={(files) => setUploadedFiles(files)}
        style={{ border: "none" }}
      />
      {!!uploadedFiles?.length && (
        <Box>
          <Divider mt="20" mb="10" />
          {uploadedFiles?.map((item) => (
            <Stack w="100%" gap="0" mt="8">
              <Text mb={7}>{item.name}</Text>
              <Progress value={100} w="100%" striped animated />
            </Stack>
          ))}
          <Divider mt="15" />
          <Group justify="flex-end" mt="15">
            <CButton w={200} loading={loading} onClick={uploadHanlder}>
              Upload
            </CButton>
          </Group>
        </Box>
      )}
    </Card>
  );
};

export default FileUpload;
