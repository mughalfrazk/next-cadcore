"use client";

import { useState } from "react";
import {
  Box,
  Card,
  Divider,
  Group,
  Progress,
  Stack,
  Text,
} from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";

import CButton from "../core/CButton";
import { uploadFileApi } from "@/lib/supabase/storage.service";
import { ProfileModel } from "@/lib/models/Profile";
import { FileFormDataPayload } from "@/lib/models/File";
import FileDropzone from "../common/FileDropzone";
import BlueDocuemntIcon from "../icons/BlueDocuemntIcon";
import OrangeDocuemntIcon from "../icons/OrangeDocuemntIcon";

type FileUploadProps = {
  client: ProfileModel;
  projectId: number
};

const FileUpload = ({ client, projectId }: FileUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPath[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const uploadHanlder = async () => {
    if (!client) return;
    try {
      setLoading(true);
      if (uploadedFiles?.length) {
        const formData: FileFormDataPayload = new FormData();
        uploadedFiles.forEach((f) => {
          formData.append("files", f);
        });
        await uploadFileApi(projectId, client.email, formData);
        setUploadedFiles([]);
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
          {uploadedFiles?.map((item, idx) => (
            <Stack w="100%" gap="0" mt="8" key={idx}>
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
