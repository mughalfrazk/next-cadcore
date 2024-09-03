"use client";

import { useClientContext } from "@/context/client-context";
import { ProfileModel } from "@/lib/models/Profile";
import { ReactNode, useEffect } from "react";

type ClientContextWrapperProps = {
  children: ReactNode;
  client: ProfileModel;
};

const ClientContextWrapper = ({
  children,
  client,
}: ClientContextWrapperProps) => {
  const { setClient } = useClientContext();

  useEffect(() => setClient(client), [client]);
  return children;
};

export default ClientContextWrapper;
