"use server"

import { parseFactory } from "@/utils/parse-factory"
import { ProfileFileRequestModel, ProjectFileListSchema } from "../models/ProjectFile"
import { serverApi } from "./serverApi"
import { TreeNodeData } from "@mantine/core"

const ProjectFileListDataParser = parseFactory(ProjectFileListSchema, "ProjectFileListDataParser")

const createProjectFileApi = async (payload: ProfileFileRequestModel) => {
  const { data, error } = await serverApi().from("project_file").insert(payload)
  if (error) throw error
  return data
}

const getFileListByProjectForTreeApi = async (project_id: number) => {
  const { data, error } = await serverApi().from("project_file").select("*, file_status (id, name)").eq("project_id", project_id)
  if (error) throw error
  const fileList = ProjectFileListDataParser(data)
  const treeNodeData: TreeNodeData[] = fileList.map(item => ({
    label: item.alias,
    value: item.file_name,
    nodeProps: item
  }))
  return treeNodeData
}

export { createProjectFileApi, getFileListByProjectForTreeApi }