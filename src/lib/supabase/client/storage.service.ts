"use client"

import { ErrorResponse, notifyError } from "@/utils/error"
import { clientApi } from "./clientApi"

const getFileDetailByPathApi = async (path: string) => {
  const { data, error } = await clientApi().storage.from("client_files").download(path)

  if (error) return notifyError({ title: error.name, message: error.message } as ErrorResponse)
  return await data?.arrayBuffer()
}

export { getFileDetailByPathApi }