import { z } from "zod";

export const ActionSchema = z.object({
  id: z.number(),
  name: z.string()
})

export const ActionListSchema = z.array(ActionSchema)

export type ActionModel = z.infer<typeof ActionSchema>
export type ActionListModel = z.infer<typeof ActionListSchema>