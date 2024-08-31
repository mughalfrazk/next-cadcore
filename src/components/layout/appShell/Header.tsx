import { Badge, Burger, Group } from "@mantine/core";
import CadcoreLogo from "@/components/icons/CadcoreLogo";
import AvatarMenu from "@/components/common/AvatarMenu";
import Link from "next/link";
import { constants } from "@/constants";
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
        <AvatarMenu />
      </Group>
    </Group>
  );
};

export default Header;
