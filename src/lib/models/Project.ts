import { z } from "zod";
import { ProjectStatusSchema } from "./ProjectStatus";

export type CreateProjectFormType = {
  name: string;
  description: string;

}

export type ProjectRequestModel = {
  name: string;
  description: string;
  status_id: number;
  client_id: string;
  created_by: string;
}

export const ProjectSchema = z.object({
  client_id: z.string(),
  created_at: z.string(),
  created_by: z.string(),
  description: z.string(),
  id: z.number(),
  name: z.string(),
  status_id: z.number(),
  project_status: ProjectStatusSchema
})

export const ProjectListSchema = z.array(ProjectSchema)

export type ProjectModel = z.infer<typeof ProjectSchema>
export type ProjectListModel = z.infer<typeof ProjectListSchema>