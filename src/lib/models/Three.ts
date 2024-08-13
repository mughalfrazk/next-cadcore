import { z } from "zod"

export const ThreeConfigSchema = z.object({
  types: z.boolean(),
  shadows: z.boolean(),
  instance: z.boolean(),
  instanceall: z.boolean(),
  verbose: z.boolean(),
  keepnames: z.boolean(),
  keepgroups: z.boolean(),
  meta: z.boolean(),
  precision: z.number(),
  pathPrefix: z.string(),
})

export type ThreeConfigModel = z.infer<typeof ThreeConfigSchema>