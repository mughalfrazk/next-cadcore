"use client"

import {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";

import { ProfileModel } from "@/lib/models/Profile";
import { ProjectListModel } from "@/lib/models/Project";

type ClientContextType = {
  client: ProfileModel | undefined;
  setClient: Dispatch<SetStateAction<ProfileModel | undefined>>;
  projectList: ProjectListModel;
  setProjectList: Dispatch<SetStateAction<ProjectListModel>>;
};

export const ClientContext = createContext<ClientContextType>({
  client: undefined,
  setClient: () => {},
  projectList: [],
  setProjectList: () => {},
});

const ClientProvider = ({ children, ...props }: { children: ReactNode, client?: ProfileModel }) => {
  const [client, setClient] = useState<ProfileModel | undefined>();
  const [projectList, setProjectList] = useState<ProjectListModel>([]);

  useEffect(() => {
    if (props.client) setClient(props.client)
  }, [props.client])

  return (
    <ClientContext.Provider
      value={{ client, setClient, projectList, setProjectList }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientContext)
export default ClientProvider;
