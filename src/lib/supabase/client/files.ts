"use client"

import { notifyError } from "@/utils/error"
import { clientApi } from "./clientApi"

const getFileDetailByPathApi = async (path: string) => {
  try {
    const { data } = await clientApi().storage.from("client_files").download(path)
    return await data?.arrayBuffer()
  } catch (error) {
    notifyError({ title: "3D Viewer Error", message: "Something went wrong, please try again." } as any)
  }
}

export { getFileDetailByPathApi }