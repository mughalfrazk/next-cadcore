import { AppShell, NavLink } from "@mantine/core";

import routes from "./routes";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const items = routes.map((item) => (
    <NavLink
      href={item.path}
      key={item.label}
      active={pathname === item.path}
      label={item.label}
      description={item?.description ?? ""}
      rightSection={item.rightSection ?? null}
      leftSection={<item.icon size="1rem" stroke={1.5} />}
    />
  ));

  return <AppShell.Navbar>{items}</AppShell.Navbar>;
};

export default Navbar;
