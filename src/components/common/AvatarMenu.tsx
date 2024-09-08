import { useRouter } from "next/navigation";
import { Menu, rem, Avatar, Text } from "@mantine/core";
import { IconSettings, IconLogout2 } from "@tabler/icons-react";

import { constants } from "@/constants";
import { useZIndex } from "@/hooks/use-z-index";
import { logout } from "@/lib/actions/auth";
import { useProfileContext } from "@/context/profile-context";

const AvatarMenu = ({ color }: { color?: string }) => {
  const z = useZIndex();
  const router = useRouter();
  const { me } = useProfileContext();

  const goToDashboard = () => {
    router.push(constants.routes.DASHBOARD);
  };

  const logoutHandler = async () => {
    await logout();
  };

  return (
    <Menu
      trigger="hover"
      openDelay={100}
      closeDelay={200}
      shadow="md"
      width={200}
      zIndex={z.dropdown}
    >
      <Menu.Target>
        <Avatar
          name={`${me?.profile.first_name} ${me?.profile.last_name}`}
          color={color ?? "var(--mantine-color-primary-7)"}
        />
      </Menu.Target>

      <Menu.Dropdown aria-hidden="false">
        <Menu.Label>
          <Text fw={700} c="black">
            {me?.profile.first_name} {me?.profile.last_name}
          </Text>
          <Text size="sm" truncate="end">
            {me?.profile.email}
          </Text>
        </Menu.Label>
        <Menu.Item
          onClick={goToDashboard}
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }
        >
          My Account
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={
            <IconLogout2 style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={logoutHandler}
        >
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AvatarMenu;
