"use client";

import { useForm, zodResolver } from "@mantine/form";
import { ZodIssue } from "zod";

import CButton from "@/components/core/CButton";
import CTextInput from "@/components/core/CInput";
import { login } from "@/lib/actions/auth";
import { LoginFormType } from "@/lib/models/Auth";
import { loginSchema } from "@/validators/auth";
import { useState } from "react";
import { notifyError, setValidationError } from "@/utils/error";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { onSubmit, getInputProps, setFieldError } = useForm<LoginFormType>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });

  const loginHandler = async (values: LoginFormType) => {
    setLoading(true);
    const result = await login(values);

    if (result?.type === "error") {
      notifyError(result);
      if (result.status === 422)
        setValidationError(result.body as ZodIssue[], setFieldError);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit(loginHandler)}>
      <CTextInput
        {...getInputProps("email")}
        type="email"
        label="Email address"
        placeholder="hello@gmail.com"
        size="md"
      />
      <CTextInput
        {...getInputProps("password")}
        type="password"
        label="Password"
        variant="filled"
        placeholder="Your password"
        mt="md"
        size="md"
      />
      <CButton
        type="submit"
        color="secondary"
        mt="xl"
        fullWidth
        loading={loading}
      >
        Login
      </CButton>
    </form>
  );
};

export default LoginForm;
