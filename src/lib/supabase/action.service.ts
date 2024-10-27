"use server"

import { parseFactory } from "@/utils/parse-factory";
import { serverApi } from "./serverApi";
import { ActionListSchema, ActionSchema } from "../models/Action";

const ActionListDataParser = parseFactory(ActionListSchema, "ActionListDataParser")
const ActionDataParser = parseFactory(ActionSchema, "ActionDataParser")

const getAllActionsApi = async () => {
  const { data, error } = await serverApi().from("action").select()
  if (error) throw error
  return ActionListDataParser(data)
}

const getActionByNameApi = async (name: string) => {
  const { data, error } = await serverApi().from("action").select().eq("name", name)
  if (error) throw error
  return ActionDataParser(data?.[0])
}

export { getAllActionsApi, getActionByNameApi }