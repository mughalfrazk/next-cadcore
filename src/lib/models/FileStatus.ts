import { z } from "zod";

export const FileStatusSchema = z.object({
  id: z.number(),
  name: z.string()
})

export const FileStatusListSchema = z.array(FileStatusSchema)

export type FileStatusModel = z.infer<typeof FileStatusSchema>
export type FileStatusListModel = z.infer<typeof FileStatusListSchema>