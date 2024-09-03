import { ActionListModel } from "@/lib/models/Action";
import { SWRResponse } from "swr";
import useAPI from ".";

export const useActionListQuery = (): SWRResponse<ActionListModel> => {
  return useAPI(`/api/action`)
}