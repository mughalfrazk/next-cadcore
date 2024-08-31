"use client";

import MainLayout from "@/components/layout/appShell";
import { usePathname } from "next/navigation";

type ConditionalLayoutProps = {
  children: React.ReactNode;
};

const ConditionalLayout = ({ children }: ConditionalLayoutProps) => {
  const pathSegments = usePathname().split("/");

  if (
    pathSegments.length === 3 &&
    pathSegments[1] === "dashboard" &&
    pathSegments[2] === "viewer"
  ) {
    return children;
  }

  return <MainLayout>{children}</MainLayout>;
};

export default ConditionalLayout;
