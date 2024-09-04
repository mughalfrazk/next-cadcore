import { ChangeEvent } from "react";
import { Checkbox, Group } from "@mantine/core";

import { EmployeeAssignmentTableData } from "@/lib/models/EmployeeAssignment";
import { updateEmpoyeeAssignmentApi } from "@/lib/supabase/employee_assignment";
import { useActionListQuery } from "@/hooks/query/action";

const ActionLabel = {
  create: "Add",
  read: "View",
  update: "Update",
  delete: "Delete",
};

const EmployeeAssignmentActionCell = (record: EmployeeAssignmentTableData) => {
  const { data: actionList } = useActionListQuery();
  const { employee, client, project, action } = record;

  const onChangeHandler = async (
    event: ChangeEvent<HTMLInputElement>,
    action_id: number
  ) => {
    const { checked } = event.target;
    const payload = {
      employee_id: employee.id,
      client_id: client.id,
      project_id: project.id,
      action_id: action_id,
      delete: !checked,
    };

    console.log(payload);
    await updateEmpoyeeAssignmentApi(payload);
  };

  return (
    action && (
      <Group justify="flex-end">
        {actionList?.map((i) => (
          <Checkbox
            key={i.id}
            checked={!!action.find((j) => j.name === i.name)}
            label={i.name.toLocaleUpperCase()}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChangeHandler(event, i.id)
            }
          />
        ))}
      </Group>
    )
  );
};

export default EmployeeAssignmentActionCell;
