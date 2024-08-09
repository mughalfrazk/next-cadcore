"use client";

import { useState } from "react";
import { useForm, zodResolver } from "@mantine/form";

import CButton from "../core/CButton";
import CTextInput from "../core/CInput";
import { signup } from "@/lib/actions/auth";
import { loginSchema } from "@/validators/auth";
import { RegisterFormType } from "@/lib/models/Auth";
import { notifyError, setValidationError } from "@/utils/error";
import { ZodIssue } from "zod";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const { onSubmit, getInputProps, setFieldError } = useForm<RegisterFormType>({
    mode: "uncontrolled",
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });

  const registerHandler = async (values: RegisterFormType) => {
    setLoading(true);
    const result = await signup(values);

    if (result?.type === "error") {
      notifyError(result);
      if (result.status === 422)
        setValidationError(result.body as ZodIssue[], setFieldError);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit(registerHandler)}>
      <CTextInput
        {...getInputProps("first_name")}
        type="first_name"
        label="First Name"
        placeholder="Johnathan"
        size="md"
      />
      <CTextInput
        {...getInputProps("last_name")}
        type="last_name"
        label="Last Name"
        placeholder="Doe"
        mt="md"
        size="md"
      />
      <CTextInput
        {...getInputProps("email")}
        type="email"
        label="Email address"
        placeholder="hello@gmail.com"
        mt="md"
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
        Register
      </CButton>
    </form>
  );
};

export default RegisterForm;
