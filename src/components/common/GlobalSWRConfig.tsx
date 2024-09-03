"use client";

import { ReactNode } from "react";
import { SWRConfig } from "swr";

async function fetcher(...args: Parameters<typeof fetch>) {
  return (await fetch(...args)).json();
}

type GlobalSWRConfigProps = {
  children: ReactNode;
};

const GlobalSWRConfig = ({ children }: GlobalSWRConfigProps) => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};

export default GlobalSWRConfig;
