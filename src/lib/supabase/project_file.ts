"use server"

import { ProfileFileRequestModel } from "../models/ProjectFile"
import { serverApi } from "./serverApi"

const createProjectFileApi = async (payload: ProfileFileRequestModel) => {
  const { data, error } = await serverApi().from("project_file").insert(payload)
  console.log(error)
  return data
}

export { createProjectFileApi }