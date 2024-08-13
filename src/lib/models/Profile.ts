import { z } from "zod";
import { RoleSchema } from "./Role";

export type ProfileUpdateRequestModel = {
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  role_id?: number;
}

export const ProfileSchema = z.object({
  id: z.string(),
  first_name: z.string().nullish(),
  last_name: z.string().nullish(),
  email: z.string(),
  avatar_url: z.string().nullish(),
  created_at: z.string(),
  updated_at: z.string().nullish(),
  role: RoleSchema,
  role_id: z.number()
})

export const ProfileListSchema = z.array(ProfileSchema)

export type ProfileModel = z.infer<typeof ProfileSchema>
export type ProfileListModel = z.infer<typeof ProfileListSchema>

