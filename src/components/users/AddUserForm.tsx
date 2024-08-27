"use client";

import { useEffect, useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { ComboboxData, Select } from "@mantine/core";
import { ZodIssue } from "zod";

import CButton from "@/components/core/CButton";
import CTextInput from "@/components/core/CInput";
import { createUserWithRole } from "@/lib/actions/auth";
import { createUserSchema } from "@/validators/auth";
import { CreateUserFormType } from "@/lib/models/Auth";
import { notifyError, setValidationError } from "@/utils/error";
import { getAllRolesApi } from "@/lib/supabase/roles";

const AddUserForm = ({ closeModal }: { closeModal: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [rolesOptions, setRolesOptions] = useState<ComboboxData>();

  const { onSubmit, getInputProps, setFieldError } =
    useForm<CreateUserFormType>({
      mode: "uncontrolled",
      initialValues: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role_id: "",
      },
      validate: zodResolver(createUserSchema),
    });

  const registerHandler = async (values: CreateUserFormType) => {
    closeModal();
    setLoading(true);

    const result = await createUserWithRole(values);
    if (result?.type === "error") {
      notifyError(result);
      if (result.status === 422)
        setValidationError(result.body as ZodIssue[], setFieldError);
    }
    setLoading(false);
    // router.refresh();
  };

  const mapRolesToOptions = async () => {
    try {
      const roles = await getAllRolesApi();
      setRolesOptions(
        roles.map((role) => ({
          value: String(role.id),
          label: role.name,
        }))
      );
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  useEffect(() => {
    mapRolesToOptions();
  }, []);

  return (
    <form onSubmit={onSubmit(registerHandler)}>
      <CTextInput
        {...getInputProps("first_name")}
        type="text"
        label="First Name"
        placeholder="Johnathan"
        size="md"
      />
      <CTextInput
        {...getInputProps("last_name")}
        type="text"
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
      <Select
        {...getInputProps("role_id")}
        variant="filled"
        size="md"
        label="User Role"
        placeholder="Pick from list"
        data={rolesOptions}
        mt="md"
      />
      <CButton
        type="submit"
        color="secondary"
        mt="xl"
        size="lg"
        fullWidth
        loading={loading}
      >
        Register
      </CButton>
    </form>
  );
};

export default AddUserForm;
