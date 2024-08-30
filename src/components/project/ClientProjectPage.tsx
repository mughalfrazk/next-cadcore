"use client";

import { useProfileContext } from "@/context/profile-context";
import ProjectList from "./ProjectList";

const ClientProjectPage = () => {
  const { me } = useProfileContext();
  return me && <ProjectList client={me?.profile} />;
};

export default ClientProjectPage;
