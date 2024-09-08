import { useEffect, useRef, useState } from "react";
import { ComboboxData, Select } from "@mantine/core";
import { useForm } from "@mantine/form";

import {
  useClientListQuery,
  useProjectByClientQuery,
} from "@/hooks/query/client";
import CButton from "../core/CButton";
import { useActionListQuery } from "@/hooks/query/action";
import { createEmployeeAssignmentApi } from "@/lib/supabase/employee_assignment";
import { CreateEmployeeAssignmentRequestModel } from "@/lib/models/EmployeeAssignment";
import { useClientContext } from "@/context/client-context";

type EmployeeAssignmentFormProps = {
  close: () => void;
};

const EmployeeAssignmentForm = ({ close }: EmployeeAssignmentFormProps) => {
  const { client } = useClientContext();
  const projectSelectRef = useRef<HTMLInputElement>(null);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [clientListOptions, setClientListOptions] = useState<ComboboxData>([]);
  const [projectListOptions, setProjectListOptions] = useState<ComboboxData>(
    []
  );
  const [actionListOptions, setActionListOptions] = useState<ComboboxData>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: clientList } = useClientListQuery();
  const { data: projectList, mutate: mutateProjectList } =
    useProjectByClientQuery(selectedClientId);
  const { data: actionList } = useActionListQuery();

  const { onSubmit, getInputProps, setValues, values } =
    useForm<CreateEmployeeAssignmentRequestModel>({
      mode: "uncontrolled",
      initialValues: {
        employee_id: client?.id as string,
        client_id: "",
        project_id: null,
        action_id: "",
      },
    });

  useEffect(() => {
    if (clientList) {
      if (!!clientList?.length) {
        setClientListOptions(() =>
          clientList.map((item) => ({
            label: `${item.first_name} ${item.last_name}`,
            value: item.id,
          }))
        );
      }
    }
  }, [clientList]);

  useEffect(() => {
    if (projectList) {
      setProjectListOptions(() =>
        projectList.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }))
      );
    }
  }, [projectList]);

  useEffect(() => {
    if (actionList) {
      setActionListOptions(() =>
        actionList.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }))
      );
    }
  }, [actionList]);

  const onClientSelectionChange = (value: string | null) => {
    if (!value) return;
    setSelectedClientId(value);
    mutateProjectList();
    setValues({ ...values, client_id: value, project_id: "" });
  };

  const createNewAssignment = async (
    values: CreateEmployeeAssignmentRequestModel
  ) => {
    try {
      setLoading(true);
      if (!values.project_id) values.project_id = null;
      console.log(values);
      await createEmployeeAssignmentApi(values);
      close();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit(createNewAssignment)}>
      <Select
        {...getInputProps("client_id")}
        onChange={onClientSelectionChange}
        placeholder="Pick from list"
        label="Client List"
        variant="filled"
        data={clientListOptions}
        size="md"
        mt="md"
      />
      <Select
        ref={projectSelectRef}
        {...getInputProps("project_id")}
        placeholder="Pick from list"
        label="Project List (Leave empty to select all projects)"
        variant="filled"
        data={projectListOptions}
        size="md"
        mt="md"
      />
      <Select
        {...getInputProps("action_id")}
        variant="filled"
        size="md"
        label="Action List"
        placeholder="Pick from list"
        data={actionListOptions}
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

export default EmployeeAssignmentForm;
