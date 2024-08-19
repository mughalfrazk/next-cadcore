import {
  ButtonProps,
  Group,
  GroupProps,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import CButton, { CButtonProps } from "../core/CButton";

type HeadingBarProps = {
  title: string;
  description: string;
  btnText?: string;
  button?: CButtonProps;
} & GroupProps;

const HeadingBar = ({
  title,
  description,
  btnText,
  button,
  ...otherProps
}: HeadingBarProps) => {
  return (
    <Group
      justify="space-between"
      align="center"
      mt={10}
      mb={15}
      mx={10}
      {...otherProps}
    >
      <Stack gap={0}>
        <Title order={3} fw={800} style={{ letterSpacing: "0.05rem" }}>
          {title}
        </Title>
        <Text c="var(--mantine-color-secondary-1)" size="sm">
          {description}
        </Text>
      </Stack>
      {button && <CButton {...button}>{button.children}</CButton>}
    </Group>
  );
};

export default HeadingBar;
