"use server"

import { createClient } from "@/utils/supabase/server"

const getRolesApi = async () => {
  const supabase = createClient();

  const result = await supabase.from("role").select()
  console.log(result)
  return result
}

export { getRolesApi }