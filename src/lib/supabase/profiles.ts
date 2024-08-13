"use server"

import { parseFactory } from "@/utils/parse-factory";
import { ProfileListSchema, ProfileSchema, ProfileUpdateRequestModel } from "../models/Profile";
import { serverApi } from "./serverApi";

const ProfileDataParser = parseFactory(ProfileSchema, "ProfileDataParser")
const ProfileListDataParser = parseFactory(ProfileListSchema, "ProfileListDataParser")

const getMyProfileApi = async () => {
  const { data: { user } } = await serverApi().auth.getUser()

  if (user) {
    const { data: result } = await serverApi().from("profiles").select().eq("id", user.id)
    return ProfileDataParser(result?.[0])
  }
  return null
}

const updateProfileApi = async (id: string, payload: ProfileUpdateRequestModel) => {
  await serverApi().from("profiles").update(payload).eq("id", id)
}

const getProfileListApi = async () => {
  const { data } = await serverApi().from("profiles").select('*, role (id, name)').order("created_at", { ascending: true })
  return ProfileListDataParser(data)
}

const getEmployeesListApi = async () => {
  const { data } = await serverApi().from("profiles").select('*, role (id, name)').order("created_at", { ascending: true })
  return ProfileListDataParser(data?.filter(item => (item.role.name === "admin" || item.role.name === "employee")))
}

const getClientListApi = async () => {
  const { data } = await serverApi().from("profiles").select('*, role (id, name)').order("created_at", { ascending: true })
  return ProfileListDataParser(data?.filter(item => (item.role.name === "client")))
}

const getProfileByIdApi = async (id: string) => {
  const { data } = await serverApi().from("profiles").select('*, role (id, name)').eq("id", id)
  return ProfileDataParser(data?.[0])
}

export { getMyProfileApi, updateProfileApi, getProfileListApi, getEmployeesListApi, getClientListApi, getProfileByIdApi }