"use server"

import { revalidatePath } from "next/cache"
import { EmployeeAssignmentListSchema, CreateEmployeeAssignmentRequestModel, EmployeeAssignmentTableData, UpdateEmployeeAssignmentRequestModel } from "../models/EmployeeAssignment"
import { ServerResponse } from "@/utils/server-response"
import { serverApi } from "./serverApi"
import { getProjectListByClientApi } from "./project"
import { parseFactory } from "@/utils/parse-factory"

const EmployeeAssignmentListDataParser = parseFactory(EmployeeAssignmentListSchema, "EmployeeAssignmentListDataParser")

const isRecordDuplicating = async (payload: CreateEmployeeAssignmentRequestModel) => {
  const checkingRepitition = await serverApi()
    .from("employee_assignment")
    .select("*")
    .eq("employee_id", payload.employee_id)
    .eq("client_id", payload.client_id)
    .eq("project_id", payload.project_id)
    .eq("action_id", payload.action_id)

  if (!!checkingRepitition.data?.length) return true
  return false
}

const createEmployeeAssignmentApi = async (payload: CreateEmployeeAssignmentRequestModel) => {
  const checkingRepitition = await isRecordDuplicating(payload)
  if (checkingRepitition) return ServerResponse("Error", null, "Bad Request", "Data already exists")

  if (payload.project_id) {
    const result = await serverApi().from("employee_assignment").insert(payload)
  } else {
    const projects = await getProjectListByClientApi(payload.client_id)

    let promises = projects.map(async item => {
      let projectPayload: CreateEmployeeAssignmentRequestModel = { ...payload, project_id: item.id.toString() }

      const duplicatedRecord = await isRecordDuplicating(projectPayload)
      if (!duplicatedRecord) return serverApi().from("employee_assignment").insert(projectPayload)
    })

    await Promise.all(promises)
  }

  revalidatePath("dashboard/user", "layout")
}

const getEmployeeAssignmentByEmployeeApi = async (employeeId: string) => {
  const { data, error } = await serverApi()
    .from("employee_assignment")
    .select(`id, created_at,
      client:profiles!employee_assignment_client_id_fkey (id, first_name, last_name), 
      employee:profiles!employee_assignment_employee_id_fkey (id, first_name, last_name), 
      action (id, name),
      project (id, name)`
    ).eq("employee_id", employeeId)

  const employeeAssignmentList = EmployeeAssignmentListDataParser(data)
  const newArray = employeeAssignmentList.reduce((acc: EmployeeAssignmentTableData[], curr) => {
    let foundRecord = false;
    const possibleUpdatedArray = acc.map((item: any) => {
      if (
        item?.client?.id === curr?.client?.id &&
        item?.project?.id === curr?.project?.id
      ) {
        foundRecord = true;
        item.action = [...item.action, curr.action];
      }
      return item;
    });

    if (foundRecord) return possibleUpdatedArray;
    else return [...acc, { ...curr, action: [curr.action] }];
  }, [])

  return newArray
}

const updateEmpoyeeAssignmentApi = async (payload: UpdateEmployeeAssignmentRequestModel) => {
  let result;
  console.log(payload)
  if (payload.delete) {
    result = await serverApi().from("employee_assignment")
      .delete()
      .eq("employee_id", payload.employee_id)
      .eq("client_id", payload.client_id)
      .eq("project_id", payload.project_id)
      .eq("action_id", payload.action_id)
  } else {
    let createPayload = { ...payload }
    delete createPayload.delete
    result = await serverApi().from("employee_assignment")
      .insert(createPayload)
  }
  console.log("result: ", result.data)
  console.log("error: ", result.error)

  revalidatePath(`dashboard/user/${payload.employee_id}`, "page")
}

export { createEmployeeAssignmentApi, getEmployeeAssignmentByEmployeeApi, updateEmpoyeeAssignmentApi }