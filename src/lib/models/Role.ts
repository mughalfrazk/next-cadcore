import { z } from "zod";

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string()
})

export const RoleListSchema = z.array(RoleSchema)

export type RoleModel = z.infer<typeof RoleSchema>
export type RoleListModel = z.infer<typeof RoleListSchema>