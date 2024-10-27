"use server"

import { uniqBy } from "lodash";

import { parseFactory } from "@/utils/parse-factory";
import { ProfileListSchema, ProfileSchema, ProfileUpdateRequestModel } from "../models/Profile";
import { serverApi } from "./serverApi";
import { whoAmI } from "./auth.service";

const ProfileDataParser = parseFactory(ProfileSchema, "ProfileDataParser")
const ProfileListDataParser = parseFactory(ProfileListSchema, "ProfileListDataParser")

const getMyProfileApi = async () => {
  const { data: { user }, error } = await serverApi().auth.getUser()
  if (error) throw error

  if (user) {
    const { data: result, error: profileError } = await serverApi().from("profiles").select().eq("id", user.id)
    if (profileError) throw profileError
    return ProfileDataParser(result?.[0])
  }
  return null
}

const updateProfileApi = async (id: string, payload: ProfileUpdateRequestModel) => {
  const { error } =  await serverApi().from("profiles").update(payload).eq("id", id)
  if (error) throw error
}

const getProfileListApi = async () => {
  const { data, error } = await serverApi().from("profiles").select('*, role (id, name)').order("created_at", { ascending: true })
  if (error) throw error
  return ProfileListDataParser(data)
}

const getEmployeesListApi = async () => {
  const { data, error } = await serverApi().from("profiles").select('*, role (id, name)').order("created_at", { ascending: true })
  if (error) throw error
  return ProfileListDataParser(data?.filter(item => (item.role.name === "admin" || item.role.name === "employee")))
}

const getClientListApi = async () => {
  const user = await whoAmI()
  const role_name = user?.profile.role.name

  let result;
  if (role_name === "admin") {
    result = await serverApi().from("profiles").select('*, role (id, name)').order("created_at", { ascending: true })
  } else if (role_name === "employee") {
    const loggedInUserId = user?.profile.id

    const { data, error } = await serverApi().from("employee_assignment").select("client_id").eq("employee_id", loggedInUserId)
    if (error) throw error
    const distinctClientIds = uniqBy(data, item => item.client_id).map(item => item.client_id)

    result = await serverApi().from("profiles").select('*, role (id, name)').in("id", distinctClientIds).order("created_at", { ascending: true })
  }
  if (result?.error) throw result?.error

  return ProfileListDataParser(result?.data?.filter(item => (item.role.name === "client")))
}

const getProfileByIdApi = async (id: string) => {
  const { data, error } = await serverApi().from("profiles").select('*, role (id, name)').eq("id", id)
  if (error) throw error
  return ProfileDataParser(data?.[0])
}

export { getMyProfileApi, updateProfileApi, getProfileListApi, getEmployeesListApi, getClientListApi, getProfileByIdApi }