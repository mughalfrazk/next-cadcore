import { ChangeEvent, Fragment, useState } from "react";
import { Checkbox, Group, Popover, Paper, Stack, Text } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { KeyedMutator } from "swr";

import { EmployeeAssignmentTableData } from "@/lib/models/EmployeeAssignment";
import { updateEmpoyeeAssignmentApi } from "@/lib/supabase/employee_assignment";
import { useActionListQuery } from "@/hooks/query/action";
import CButton from "../core/CButton";

const ActionLabel = {
  create: "Add New File",
  read: "View",
  update: "Update Status of File",
  delete: "Delete File",
};

type ActionLabelKey = keyof typeof ActionLabel

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
  const [persistedEvent, setPersistedEvent] =
    useState<ChangeEvent<HTMLInputElement> | null>();
  const popoverRef = useClickOutside(() => setPersistedEvent(null));

  return (
    <Popover
      key={i.id}
      opened={!!persistedEvent}
      width={200}
      position="bottom"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <Checkbox
          checked={!!action.find((j) => j.name === i.name)}
          label={ActionLabel[i.name as ActionLabelKey]}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPersistedEvent(event)
          }
        />
      </Popover.Target>
      <Popover.Dropdown bg="var(--mantine-color-body)">
        <Paper ref={popoverRef} shadow="sm">
          <Text size="sm">Are you sure you want to update the permission?</Text>
          <Stack mt={10} gap={4}>
            <CButton
              fullWidth
              variant="subtle"
              onClick={() => setPersistedEvent(null)}
            >
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
        </Paper>
      </Popover.Dropdown>
    </Popover>
  );
};

type EmployeeAssignmentActionCellProps = {
  record: EmployeeAssignmentTableData;
  refreshAssignmentListQuery: KeyedMutator<unknown>;
};

const EmployeeAssignmentActionCell = ({
  record,
  refreshAssignmentListQuery,
}: EmployeeAssignmentActionCellProps) => {
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
      await refreshAssignmentListQuery();
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
