import { createClient } from "@/utils/supabase/client"
import { ProfileUpdateRequestModel } from "../models/Profile";

const getMyProfileApi = async () => {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    const res = await supabase.from("profiles").select().eq("id", session.user.id)
    return res
  }
  return null
}

const updateProfileApi = async (id: string, payload: ProfileUpdateRequestModel) => {
  const supabase = createClient();

  const result = await supabase.from("profiles").update(payload).eq("id", id)
  return result
}

export { getMyProfileApi, updateProfileApi }