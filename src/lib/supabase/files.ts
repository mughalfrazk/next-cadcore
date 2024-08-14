"use server"

import fs from "fs"
import { FileWithPath } from "@mantine/dropzone"

import { serverApi } from "./serverApi"
import { parseFactory } from "@/utils/parse-factory"
import { FileFormDataPayload } from "@/components/clients/FileUpload"
import { FileListSchema } from "../models/File"
import { TreeNodeData } from "@mantine/core"

const FileListDataParser = parseFactory(FileListSchema, "FileListDataParser")

const uploadFileApi = async (folder_name: string, payload: FileFormDataPayload) => {
  const files = payload.getAll("files") as FileWithPath[]
  const promises = files.map(file => {
    return serverApi().storage
      .from("client_files")
      .upload(`${folder_name}/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      })
  })

  return await Promise.all(promises)
}

const getListOfFilesApi = async (folder_name: string) => {
  const { data } = await serverApi().storage.from("client_files").list(folder_name, { limit: 20, offset: 0, sortBy: { column: 'name', order: 'asc' }, })
  const fileList = FileListDataParser(data)
  const treeNodeData: TreeNodeData[] = fileList.map(item => ({
    label: item.name,
    value: item.id,
    nodeProps: item
  }))

  return treeNodeData
}


export { uploadFileApi, getListOfFilesApi }