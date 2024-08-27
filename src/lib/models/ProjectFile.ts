import { z } from "zod";

export type ProfileFileRequestModel = {
  project_id: number;
  file_name: string;
  status_id: number;
  alias: string;
}

export const ProjectFileSchema = z.object({
  id: z.number(),
  name: z.string(),
  project_id: z.number(),
  cost: z.number(),
  file_name: z.string(),
  alias: z.string()
})

export const ProjectFileListSchema = z.array(ProjectFileSchema)

export type ProjectFileModel = z.infer<typeof ProjectFileSchema>
export type ProjectFileListModel = z.infer<typeof ProjectFileListSchema>