"use client"

import { MouseEventHandler, ReactNode } from "react";
import { Button, ButtonProps } from "@mantine/core";

import CSubmitButton, { SubmitButtonProps } from "./CSubmitButton";
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

export interface CButtonProps extends ButtonProps {
  type?: "submit" | "reset" | "button";
  children: ReactNode;
  ariaLabel?: string;
  variant?: "filled" | "light" | "outline" | "subtle";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isIconOnly?: boolean;
  isCompact?: boolean;
  isSubmit?: boolean;
}

const CButton = ({
  children,
  ariaLabel,
  variant = "filled",
  size = "lg",
  onClick,
  isIconOnly = false,
  isSubmit = false,
  ...defaultProps
}: CButtonProps) => {
  const ButtonComponent = (submitProps: SubmitButtonProps) => (
    <Button
      variant={variant}
      classNames={classes}
      aria-label={ariaLabel}
      h={getHeight(size)}
      px={isIconOnly ? 7 : undefined}
      onClick={onClick}
      style={{ ...defaultProps.style }}
      loaderProps={{ type: "dots" }}
      {...defaultProps}
      {...submitProps}
    >
      {children}
    </Button>
  );

  if (isSubmit) {
    return <CSubmitButton btn={ButtonComponent} />;
  }

  return <ButtonComponent />;
};

export default CButton;
