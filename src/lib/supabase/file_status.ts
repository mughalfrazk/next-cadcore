"use server"

import { serverApi } from "./serverApi"
import { parseFactory } from "@/utils/parse-factory"
import { FileStatusSchema } from "../models/FileStatus"

const FileStatusDataParser = parseFactory(FileStatusSchema, "FileStatusDataParser")

const getFileStatusByName = async (status_name: string) => {
  const { data } = await serverApi().from("file_status").select().eq("name", status_name)
  return FileStatusDataParser(data?.[0])
}

export { getFileStatusByName }