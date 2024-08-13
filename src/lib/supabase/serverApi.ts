import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js";

export const serverApi = (): SupabaseClient => {
  return createClient()
}