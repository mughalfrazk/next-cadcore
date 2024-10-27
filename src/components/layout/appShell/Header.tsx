import Link from "next/link";
import { Badge, Burger, Group } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

import { constants } from "@/constants";
import CButton from "@/components/core/CButton";
import CadcoreLogo from "@/components/icons/CadcoreLogo";
import AvatarMenu from "@/components/common/AvatarMenu";
import { useMantineColorScheme } from "@/hooks/use-mantine-color-scheme-wrapper";
import { useProfileContext } from "@/context/profile-context";
import { getRoleColor } from "@/utils/function";

interface HeaderProps {
  mobileOpened: boolean;
  desktopOpened: boolean;
  toggleMobile: () => void;
  toggleDesktop: () => void;
}

const Header = ({
  mobileOpened,
  toggleMobile,
  desktopOpened,
  toggleDesktop,
}: HeaderProps) => {
  const { me } = useProfileContext();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="sm"
          size="sm"
        />
        <Burger
          opened={desktopOpened}
          onClick={toggleDesktop}
          visibleFrom="sm"
          size="sm"
        />
        <Link href={constants.routes.DASHBOARD}>
          <CadcoreLogo h={50} />
        </Link>
      </Group>
      <Group>
        <Badge
          variant="light"
          color={getRoleColor(me?.profile.role.name as string)}
        >
          {me?.profile.role.name.toUpperCase()}
        </Badge>
        <CButton
          variant="light"
          radius="xl"
          isIconOnly
          onClick={toggleColorScheme}
        >
          {colorScheme === "dark" ? (
            <IconSun color="var(--mantine-color-primary-0)" />
          ) : (
            <IconMoon color="var(--mantine-color-primary-6)" />
          )}
        </CButton>
        <AvatarMenu />
      </Group>
    </Group>
  );
};

export default Header;
