import { createClient } from "@/utils/supabase/client"
import { SupabaseClient } from "@supabase/supabase-js";

export const clientApi = (): SupabaseClient => {
  return createClient()
}