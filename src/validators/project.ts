import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(2, { message: 'Name should be atleast 2 letters' }),
  description: z.string().nullish()
})