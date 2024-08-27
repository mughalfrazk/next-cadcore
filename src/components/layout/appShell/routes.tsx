import {
  IconLayoutDashboardFilled,
  IconBriefcaseFilled,
  IconUserFilled,
  IconActivity,
  IconUsers,
  IconProps,
  Icon,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type RouteItem = {
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  label: string;
  path: string;
  description?: string;
  rightSection?: React.ReactNode;
};

const routes: RouteItem[] = [
  {
    icon: IconLayoutDashboardFilled,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: IconUserFilled,
    label: "Employees",
    path: "/dashboard/user",
  },
  {
    icon: IconBriefcaseFilled,
    label: "Clients",
    path: "/dashboard/client",
  },
  { icon: IconActivity, label: "Activity", path: "#hello" },
];

export default routes;
