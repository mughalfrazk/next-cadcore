import { z } from "zod";
import { FileStatusSchema } from "./FileStatus";

export type ProfileFileRequestModel = {
  project_id: number;
  file_name: string;
  status_id: number;
  alias: string;
}

export const ProjectFileSchema = z.object({
  id: z.number(),
  project_id: z.number(),
  cost: z.number().nullish(),
  file_name: z.string(),
  alias: z.string(),
  file_status: FileStatusSchema,
  created_at: z.string()
})

export const ProjectFileListSchema = z.array(ProjectFileSchema)

export type ProjectFileModel = z.infer<typeof ProjectFileSchema>
export type ProjectFileListModel = z.infer<typeof ProjectFileListSchema>