import { ChangeEvent, useEffect, useState } from "react";
import { Checkbox, Group, Popover, Select, Stack, Text } from "@mantine/core";

import { EmployeeAssignmentTableData } from "@/lib/models/EmployeeAssignment";
import { updateEmpoyeeAssignmentApi } from "@/lib/supabase/employee_assignment";
import { useActionListQuery } from "@/hooks/query/action";
import CButton from "../core/CButton";
import { useClickOutside } from "@mantine/hooks";

const ActionLabel = {
  create: "Add",
  read: "View",
  update: "Update",
  delete: "Delete",
};

const PermissionCheckbox = ({
  i,
  action,
  loading,
  onChangeHandler,
}: {
  i: { id: number; name: string };
  action: { id: number; name: string }[];
  loading: boolean;
  onChangeHandler: (
    event: ChangeEvent<HTMLInputElement>,
    action_id: number
  ) => Promise<void>;
}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [persistedEvent, setPersistedEvent] =
    useState<ChangeEvent<HTMLInputElement>>();

  const handleClickOutside = () => setOpened(false);

  // useEffect(() => {
  //   document.addEventListener("mouseup", handleClickOutside);
  //   return () => {
  //     console.log("unmounted");
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <Popover
      key={i.id}
      opened={opened}
      width={200}
      position="bottom"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <Checkbox
          checked={!!action.find((j) => j.name === i.name)}
          label={i.name.toLocaleUpperCase()}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setOpened(true);
            setPersistedEvent(event);
          }}
        />
      </Popover.Target>
      <Popover.Dropdown bg="var(--mantine-color-body)">
        <Text size="sm">Are you sure you want to update the permission?</Text>
        <Stack mt={10} gap={4}>
          <CButton fullWidth variant="subtle" onClick={() => setOpened(false)}>
            Cancel
          </CButton>
          <CButton
            fullWidth
            loading={loading}
            onClick={() =>
              persistedEvent && onChangeHandler(persistedEvent, i.id)
            }
          >
            Confirm
          </CButton>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

const EmployeeAssignmentActionCell = (record: EmployeeAssignmentTableData) => {
  const { data: actionList } = useActionListQuery();
  const { employee, client, project, action } = record;

  const [loading, setLoading] = useState<boolean>(false);

  const onChangeHandler = async (
    event: ChangeEvent<HTMLInputElement>,
    action_id: number
  ) => {
    try {
      setLoading(true);
      const { checked } = event.target;
      const payload = {
        employee_id: employee.id,
        client_id: client.id,
        project_id: project.id,
        action_id: action_id,
        delete: checked,
      };

      await updateEmpoyeeAssignmentApi(payload);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    action && (
      <Group justify="flex-end">
        {actionList?.map((i) => (
          <PermissionCheckbox
            key={i.id}
            i={i}
            action={action}
            loading={loading}
            onChangeHandler={onChangeHandler}
          />
        ))}
      </Group>
    )
  );
};

export default EmployeeAssignmentActionCell;
