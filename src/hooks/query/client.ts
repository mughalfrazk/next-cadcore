import { ProfileListModel } from "@/lib/models/Profile";
import { ProjectListModel } from "@/lib/models/Project";
import { SWRResponse } from "swr";
import useAPI from ".";

export const useClientListQuery = (): SWRResponse<ProfileListModel> => {
  return useAPI(`/api/client`)
}

export const useProjectByClientQuery = (clientId: string): SWRResponse<ProjectListModel> => {
  return useAPI(!!clientId ? `/api/client/${clientId}/project` : null);
}