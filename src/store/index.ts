import { ProfileModel } from "@/lib/models/Profile";
import { ProjectListModel } from "@/lib/models/Project";
import { create } from "zustand";

type State = {
  selectedClient: ProfileModel | null
  projectList: ProjectListModel
}

type Action = {
  setSelectedClient: (client: ProfileModel) => void
  setProjectList: (projectList: ProjectListModel) => void
}

const useStore = create<State & Action>((set) => ({
  selectedClient: null,
  projectList: [],
  setSelectedClient: (client) => set({ selectedClient: { ...client } }),
  setProjectList: (projectList) => set({ projectList: { ...projectList } })
}))

export const selectStoreClient = () => useStore(state => state.selectedClient)
// export const projectList = useStore(state => state.projectList)
export const setSelectedClient = useStore(state => state.setSelectedClient)
// export const setProjectList = useStore(state => state.setProjectList)

export default useStore