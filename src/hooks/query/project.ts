import useAPI from "."

export const useProjectListByClientQuery = (clientId: string) => {
  return useAPI(clientId ? `/api/project?clientId=${clientId}` : null)
}