"use server"

import { parseFactory } from "@/utils/parse-factory"
import { serverApi } from "./serverApi"
import { ProjectStatusSchema } from "../models/ProjectStatus"

const ProjectStatusDataParser = parseFactory(ProjectStatusSchema, "ProjectStatusDataParser")

const getProjectStatusByName = async (status_name: string) => {
  const { data, error } = await serverApi().from("project_status").select().eq("name", status_name)
  if (error) throw error
  return ProjectStatusDataParser(data?.[0])
}

export { getProjectStatusByName }