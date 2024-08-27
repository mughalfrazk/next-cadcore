"use client";

import { Box, Group, Portal, rem } from "@mantine/core";
import { User } from "@supabase/supabase-js";
import { useHeadroom } from "@mantine/hooks";
import Link from "next/link";

import { useZIndex } from "@/hooks/use-z-index";
import CadcoreLogo from "../icons/CadcoreLogo";
import CButton from "../core/CButton";
import AvatarMenu from "./AvatarMenu";

type HeaderProps = {
  user: User | null;
};

const PublicHeader = ({ user }: HeaderProps) => {
  const pinned = useHeadroom({ fixedAt: 120 });
  const z = useZIndex();

  return (
    <Portal>
      <Box
        style={{
          top: 0,
          left: 0,
          right: 0,
          position: "fixed",
          padding: "var(--mantine-spacing-xs)",
          height: rem(60),
          transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
          transition: "transform 400ms ease",
          backgroundColor: "white",
          zIndex: z.docked,
        }}
      >
        <Group px={{ md: "15rem", sm: "6rem" }} justify="space-between">
          <CadcoreLogo h={42} />
          {user ? (
            <AvatarMenu />
          ) : (
            <Link href="/auth">
              <CButton>Go to Login</CButton>
            </Link>
          )}
        </Group>
      </Box>
    </Portal>
  );
};

export default PublicHeader;
