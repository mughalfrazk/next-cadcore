import { ProfileModel } from "@/lib/models/Profile";
import { create } from "zustand";

type State = {
  selectedClient: ProfileModel | null
}

type Action = {
  saveSelectedClient: (client: ProfileModel) => void
}

export const useStore = create<State & Action>((set) => ({
  selectedClient: null,
  saveSelectedClient: (client) => set({ selectedClient: { ...client } })
}))