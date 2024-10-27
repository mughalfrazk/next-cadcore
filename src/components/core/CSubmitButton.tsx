import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export type SubmitButtonProps = {
  type?: "submit" | "reset" | "button" | undefined;
  loading?: boolean;
  disabled?: boolean;
};

const CSubmitButton = ({
  btn,
}: {
  btn: (submitProps: SubmitButtonProps) => ReactNode;
}) => {
  const { pending } = useFormStatus();
  const ButtonComponent = btn;

  return <ButtonComponent type="submit" loading={pending} disabled={pending} />;
};

export default CSubmitButton;
