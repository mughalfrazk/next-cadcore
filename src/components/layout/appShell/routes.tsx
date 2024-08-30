import {
  IconLayoutDashboardFilled,
  IconBriefcaseFilled,
  IconUserFilled,
  IconActivity,
  IconProps,
  Icon,
  IconPresentationFilled,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type RouteItem = {
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  label: string;
  path: string | ((...args: string[]) => string);
  role: string[];
  description?: string;
  rightSection?: React.ReactNode;
};

const routes: RouteItem[] = [
  {
    icon: IconLayoutDashboardFilled,
    label: "Dashboard",
    path: "/dashboard",
    role: ["admin", "employee", "client"],
  },
  {
    icon: IconUserFilled,
    label: "Employees",
    path: "/dashboard/user",
    role: ["admin"],
  },
  {
    icon: IconBriefcaseFilled,
    label: "Clients",
    path: "/dashboard/client",
    role: ["admin", "employee"],
  },
  {
    icon: IconPresentationFilled,
    label: "Projects",
    path: (clientId: string) => `/dashboard/client/${clientId}`,
    role: ["client"],
  },
  { icon: IconActivity, label: "Activity", path: "#hello", role: [] },
];

export default routes;
