import { z } from "zod";
import { ActionSchema } from "./Action"
import { ProfileIdNameSchema } from "./Profile";
import { ProjectIdNameSchema } from "./Project";

export type CreateEmployeeAssignmentRequestModel = {
  employee_id: string;
  client_id: string;
  project_id?: string | null;
  action_id: string;
}

export type UpdateEmployeeAssignmentRequestModel = {
  employee_id: string;
  client_id: string;
  project_id: number;
  action_id: number;
  delete?: boolean;
}

export type EmployeeAssignmentTableData = {
  id: number;
  employee: {
    id: string;
    first_name: string;
    last_name: string;
  },
  client: {
    id: string;
    first_name: string;
    last_name: string;
  },
  project: {
    id: number;
    name: string;
  },
  action: {
    id: number;
    name: string;
  }[]
}

export const EmployeeAssignmentSchema = z.object({
  id: z.number(),
  action: ActionSchema,
  client: ProfileIdNameSchema,
  employee: ProfileIdNameSchema,
  project: ProjectIdNameSchema.nullish()
})

export const EmployeeAssignmentListSchema = z.array(EmployeeAssignmentSchema)

export type EmployeeAssignmentModel = z.infer<typeof EmployeeAssignmentSchema>
export type EmployeeAssignmentListModel = z.infer<typeof EmployeeAssignmentListSchema>