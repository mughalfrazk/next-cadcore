"use server"

import { serverApi } from "./serverApi";
import { getProfileByIdApi } from "./profiles";

const whoAmI = async () => {
  const { data: { user } } = await serverApi().auth.getUser()
  if (!user) return

  const profile = await getProfileByIdApi(user?.id)
  return { session: user, profile }
}

export { whoAmI }