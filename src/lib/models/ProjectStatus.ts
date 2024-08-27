import { z } from "zod";

export const ProjectStatusSchema = z.object({
  id: z.number(),
  name: z.string()
})

export const ProjectStatusListSchema = z.array(ProjectStatusSchema)

export type ProjectStatusModel = z.infer<typeof ProjectStatusSchema>
export type ProjectStatusListModel = z.infer<typeof ProjectStatusListSchema>