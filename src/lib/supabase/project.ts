"use server"

import { parseFactory } from "@/utils/parse-factory"
import { ProjectListSchema, ProjectRequestModel, ProjectWithFilesSchema } from "../models/Project"
import { getProjectStatusByName } from "./project_status"
import { serverApi } from "./serverApi"
import { revalidatePath } from "next/cache"
import { TreeNodeData } from "@mantine/core"
import { ProjectFileModel } from "../models/ProjectFile"

const ProjectListDataParser = parseFactory(ProjectListSchema, "ProjectListDataParser")
const ProjectWithFilesDataParser = parseFactory(ProjectWithFilesSchema, "ProjectWithFilesDataParser")

const createNewProjectApi = async (payload: ProjectRequestModel) => {
  const project_status = await getProjectStatusByName("planning")
  if (!project_status) throw new Error("Project status exception.")
  payload.status_id = project_status.id
  await serverApi().from("project").insert(payload)

  revalidatePath("/dashboard", "layout")
}

const getProjectListByClientApi = async (clientId: string) => {
  const { data } = await serverApi().from("project").select('*, project_status (id, name), project_file (id)').eq("client_id", clientId)
  return ProjectListDataParser(data)
}

const getProjectDetailWithFilesTreeByIdApi = async (projectId: number) => {
  const { data } = await serverApi().from("project").select('*, project_status (id, name), project_file (*, file_status (id, name))').eq("id", projectId)
  const project = ProjectWithFilesDataParser(data?.[0])
  const treeNodeData: TreeNodeData[] = project.project_file.map((item) => ({
    label: item.alias,
    value: item.file_name,
    nodeProps: item
  }))
  return { project, fileTreeData: treeNodeData }
}

export { createNewProjectApi, getProjectListByClientApi, getProjectDetailWithFilesTreeByIdApi }