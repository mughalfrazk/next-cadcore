"use client";

import { useState } from "react";
import { useForm, zodResolver } from "@mantine/form";

import CButton from "@/components/core/CButton";
import CTextInput from "@/components/core/CInput";
import { ErrorResponse, notifyError } from "@/utils/error";
import {
  CreateProjectFormType,
  ProjectRequestModel,
} from "@/lib/models/Project";
import { createProjectSchema } from "@/validators/project";
import { clientApi } from "@/lib/supabase/client/clientApi";
import { createNewProjectApi } from "@/lib/supabase/project";
import { ProfileModel } from "@/lib/models/Profile";

const AddProjectForm = ({
  client,
  closeModal,
}: {
  client: ProfileModel;
  closeModal: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const { onSubmit, getInputProps } =
    useForm<CreateProjectFormType>({
      mode: "uncontrolled",
      initialValues: {
        name: "",
        description: "",
      },
      validate: zodResolver(createProjectSchema),
    });

  const createProject = async (values: CreateProjectFormType) => {
    try {
      setLoading(true);
      const { data: user } = await clientApi().auth.getSession();

      if (!client) return;
      if (!user.session?.user?.id) return;

      const payload: ProjectRequestModel = {
        ...values,
        status_id: 0,
        client_id: client.id,
        created_by: user.session?.user.id,
      };

      await createNewProjectApi(payload);
      closeModal();
    } catch (error) {
      console.log(error);
      notifyError({
        title: "Server error",
        message: "Something went wrong, please try again",
      } as ErrorResponse);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit(createProject)}>
      <CTextInput
        {...getInputProps("name")}
        type="text"
        label="Name"
        placeholder="Cyberpunk"
        size="md"
      />
      <CTextInput
        {...getInputProps("description")}
        type="text"
        label="Description"
        placeholder="Write something about the project..."
        mt="md"
        size="md"
      />
      <CButton
        type="submit"
        color="secondary"
        mt="xl"
        size="lg"
        fullWidth
        loading={loading}
      >
        Submit
      </CButton>
    </form>
  );
};

export default AddProjectForm;
