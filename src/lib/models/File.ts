import { z } from "zod"

export const MetadataSchema = z.object({
  eTag: z.string(),
  size: z.number(),
  mimetype: z.string(),
  cacheControl: z.string(),
  lastModified: z.string(),
  contentLength: z.number(),
  httpStatusCode: z.number(),
})

export const FileSchema = z.object({
  name: z.string(),
  id: z.string(),
  updated_at: z.string(),
  created_at: z.string(),
  last_accessed_at: z.string(),
  metadata: MetadataSchema
})

export const FileListSchema = z.array(FileSchema)

export type MetadataModel = z.infer<typeof MetadataSchema>
export type FileModel = z.infer<typeof FileSchema>
export type FileListModel = z.infer<typeof FileListSchema>