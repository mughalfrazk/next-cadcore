"use server"

import { serverApi } from "./serverApi";
import { getProfileByIdApi } from "./profiles.service";

const whoAmI = async () => {
  const { data: { user }, error } = await serverApi().auth.getUser()
  if (error) throw error
  if (!user) return

  const profile = await getProfileByIdApi(user?.id)
  return { session: user, profile }
}

export { whoAmI }