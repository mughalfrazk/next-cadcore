import { useRouter } from "next/navigation";
import { Group, rem, Text } from "@mantine/core";
import {
  IconChevronLeft,
  IconArrowsMinimize,
  IconArrowsMaximize,
} from "@tabler/icons-react";

import { useZIndex } from "@/hooks/use-z-index";
import CadcoreLogo from "@/components/icons/CadcoreLogo";
import CButton from "../../core/CButton";

type HeaderProps = {
  toggle: () => Promise<void>;
  fullscreen: boolean;
};

const Header = ({ toggle, fullscreen }: HeaderProps) => {
  const z = useZIndex();
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Group
      justify="space-between"
      align="flex-start"
      style={{
        position: "absolute",
        zIndex: z.popover,
        top: 20,
        right: 20,
        left: 20,
      }}
    >
      {!fullscreen && (
        <CButton leftSection={<IconChevronLeft />} onClick={goBack}>
          Back
        </CButton>
      )}
      <Group gap={0} align="flex-start" pos={"relative"}>
        <CadcoreLogo h={55} />
        {/* <Text
          fw={200}
          pt={2}
          style={{
            fontSize: rem(70),
            position: "absolute",
            top: "45%",
            right: "45%",
            zIndex: z.hide,
            opacity: 0.4,
            transform: "translate(50%, -50%)"
          }}
          c={"var(--mantine-color-grey-3)"}
        > */}
        <Text
          fw={200}
          pt={2}
          style={{
            fontSize: rem(30),
          }}
          c={"var(--mantine-color-grey-3)"}
        >
          Studio
        </Text>
      </Group>
      <CButton isIconOnly={true} onClick={toggle} px={6}>
        {fullscreen ? <IconArrowsMinimize /> : <IconArrowsMaximize />}
      </CButton>
    </Group>
  );
};

export default Header;
