import { Box, Flex, TextInput, TextInputProps } from "@mantine/core";

interface CTextInputProps
  extends Omit<
    TextInputProps,
    "variant" | "classNames" | "aria-label" | "w" | "width"
  > {
  variant?: string;
  ariaLabel?: string;
  width?: number | string;
}

const CTextInput = ({
  ariaLabel,
  variant = "filled",
  width,
  ...rest
}: CTextInputProps) => {
  return (
    <Box w={"100%"}>
      <TextInput variant={variant} aria-label={ariaLabel} {...rest} />
    </Box>
  );
};

export default CTextInput;
