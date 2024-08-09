import { MouseEventHandler, ReactNode } from "react";
import { Button, ButtonProps } from "@mantine/core";
import classes from "./CButton.module.css";

const getHeight = (size: string) => {
  switch (size) {
    case "xs":
      return 26;
    case "sm":
      return 30;
    case "md":
      return 34;
    case "lg":
      return 38;
    case "xl":
      return 42;
  }
};

interface CButtonProps extends ButtonProps {
  type?: "submit" | "reset" | "button";
  children: ReactNode;
  ariaLabel?: string;
  variant?: "filled" | "light" | "outline" | "subtle";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isIconOnly?: boolean;
  isCompact?: boolean;
}

const CButton = ({
  children,
  ariaLabel,
  variant = "filled",
  size = "lg",
  onClick,
  isIconOnly = false,
  isCompact = false,
  ...defaultProps
}: CButtonProps) => {
  return (
    <Button
      variant={variant}
      classNames={classes}
      aria-label={ariaLabel}
      h={getHeight(size)}
      px={isIconOnly && isCompact ? 9 : undefined}
      onClick={onClick}
      style={{ ...defaultProps.style }}
      {...defaultProps}
    >
      {children}
    </Button>
  );
};

export default CButton;
