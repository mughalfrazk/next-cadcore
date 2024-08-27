"use server"

import { parseFactory } from "@/utils/parse-factory"
import { ProjectListSchema, ProjectRequestModel } from "../models/Project"
import { getProjectStatusByName } from "./project_status"
import { serverApi } from "./serverApi"
import { revalidatePath } from "next/cache"

const ProjectListDataParser = parseFactory(ProjectListSchema, "ProjectListDataParser")

const createNewProjectApi = async (payload: ProjectRequestModel) => {
  const project_status = await getProjectStatusByName("planning")
  if (!project_status) throw new Error("Project status exception.")
  payload.status_id = project_status.id
  await serverApi().from("project").insert(payload)

  revalidatePath("/dashboard", "layout")
}

const getProjectListByClientApi = async (clientId: string) => {
  const { data } = await serverApi().from("project").select('*, project_status (id, name)').eq("client_id", clientId)
  return ProjectListDataParser(data)
}

export { createNewProjectApi, getProjectListByClientApi }