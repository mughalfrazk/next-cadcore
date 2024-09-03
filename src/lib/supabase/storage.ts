"use server"

import { revalidatePath } from "next/cache"
import { TreeNodeData } from "@mantine/core"
import { FileWithPath } from "@mantine/dropzone"
import { v4 as uuidv4 } from "uuid"

import { parseFactory } from "@/utils/parse-factory"
import { FileFormDataPayload, FileListSchema } from "../models/File"
import { serverApi } from "./serverApi"
import { getFileStatusByName } from "./file_status"
import { createProjectFileApi } from "./project_file"

const FileListDataParser = parseFactory(FileListSchema, "FileListDataParser")

const saveFileInStorageAndDatabase = async (project_id: number, file_status: number, folder_name: string, file: FileWithPath) => {
  const randomFilename = uuidv4()
  const randomFilenameWithExtension = `${randomFilename}.${file.name.split(".").pop()}`
  const sRes = await serverApi().storage
    .from("client_files")
    .upload(`${folder_name}/${randomFilenameWithExtension}`, file, {
      cacheControl: "3600",
      upsert: false,
    })
  const dRes = await createProjectFileApi({
    project_id,
    file_name: randomFilenameWithExtension,
    status_id: file_status,
    alias: file.name
  })

  return [sRes, dRes]
}

const uploadFileApi = async (project_id: number, folder_name: string, payload: FileFormDataPayload) => {
  const file_status = await getFileStatusByName("initial_draft")
  if (!file_status) throw new Error("File status exception.")

  const files = payload.getAll("files") as FileWithPath[]
  const promises = files.map(file =>
    saveFileInStorageAndDatabase(project_id, file_status.id, folder_name, file)
  )

  revalidatePath("dashboard/clients", "layout")
  return await Promise.all(promises)
}



const getListOfFilesFromStorageApi = async (folder_name: string) => {
  const { data } = await serverApi().storage.from("client_files").list(folder_name, { limit: 20, offset: 0, sortBy: { column: 'name', order: 'asc' }, })
  const fileList = FileListDataParser(data)
  const treeNodeData: TreeNodeData[] = fileList.map(item => ({
    label: item.name,
    value: item.id,
    nodeProps: item
  }))

  return treeNodeData
}


export { uploadFileApi, getListOfFilesFromStorageApi }