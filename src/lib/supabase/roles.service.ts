"use server"

import { parseFactory } from "@/utils/parse-factory";
import { serverApi } from "./serverApi";
import { RoleListSchema, RoleSchema } from "../models/Role";

const RoleListDataParser = parseFactory(RoleListSchema, "RoleListDataParser")
const RoleDataParser = parseFactory(RoleSchema, "RoleDataParser")

const getAllRolesApi = async () => {
  const { data, error } = await serverApi().from("role").select()
  if (error) throw error
  return RoleListDataParser(data)
}

const getRoleByName = async (name: string) => {
  const { data, error } = await serverApi().from("role").select().eq("name", name)
  if (error) throw error
  return RoleDataParser(data?.[0])
}

export { getAllRolesApi, getRoleByName }