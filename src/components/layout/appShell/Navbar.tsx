import { useEffect } from "react";
import { AppShell, NavLink } from "@mantine/core";
import { usePathname } from "next/navigation";

import routes, { RouteItem } from "./routes";
import { useProfileContext } from "@/context/profile-context";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const { me } = useProfileContext();

  const getLinkByRole = (item: RouteItem) => {
    const loggedInRole = me?.profile.role.name;
    if (loggedInRole && item.role.includes(loggedInRole)) {
      const href =
        typeof item.path === "string" ? item.path : item.path(me.profile.id);
      return (
        <NavLink
          component={Link}
          href={href}
          key={item.label}
          active={pathname === href}
          label={item.label}
          description={item?.description ?? ""}
          rightSection={item.rightSection ?? null}
          leftSection={<item.icon size="1rem" stroke={1.5} />}
        />
      );
    }
  };

  return (
    <AppShell.Navbar>
      {routes.map((item) => getLinkByRole(item)).filter((item) => !!item)}
    </AppShell.Navbar>
  );
};

export default Navbar;
