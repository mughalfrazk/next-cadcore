import { useEffect, useState } from "react";
import { Menu, rem, Avatar, Text } from "@mantine/core";
import { IconSettings, IconLogout2 } from "@tabler/icons-react";
import Link from "next/link";

import { constants } from "@/constants";
import { useZIndex } from "@/hooks/use-z-index";
import { logout } from "@/lib/actions/auth";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

type AvatarMenuProps = {};

const AvatarMenu = (props: AvatarMenuProps) => {
  const z = useZIndex();
  const router = useRouter();
  const [user, setUser] = useState<Session>();

  const getUserSession = async () => {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) setUser(session);
  };

  const goToDashboard = () => {
    router.push(constants.routes.DASHBOARD);
  };

  const logoutHandler = async () => {
    await logout();
  };

  useEffect(() => {
    getUserSession();
  }, []);

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
          name={`${user?.user.user_metadata.first_name} ${user?.user.user_metadata.last_name}`}
          color="primary"
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          <Text fw={700} c="black">
            {user?.user.user_metadata.first_name}{" "}
            {user?.user.user_metadata.last_name}
          </Text>
          <Text size="sm" truncate="end">
            {user?.user.user_metadata.email}
            {user?.user.user_metadata.email}
            {user?.user.user_metadata.email}
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
