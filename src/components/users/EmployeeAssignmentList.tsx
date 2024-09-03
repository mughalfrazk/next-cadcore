"use client";

import { Fragment } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Checkbox, Group, Modal } from "@mantine/core";

import { useClientContext } from "@/context/client-context";
import { useEmployeeAssignmentByEmployeeQuery } from "@/hooks/query/employee-assignment";
import { EmployeeAssignmentTableData } from "@/lib/models/EmployeeAssignment";
import EmployeeAssignmentForm from "./EmployeeAssignmentForm";
import HeadingBar from "../common/HeadingBar";
import Table from "../common/Table";

const columns = [
  {
    accessor: "name",
    title: "Project",
    render: ({ project }: EmployeeAssignmentTableData) => project?.name,
  },
  {
    accessor: "id",
    title: "Client",
    render: ({ client }: EmployeeAssignmentTableData) =>
      client && `${client?.first_name} ${client?.last_name}`,
  },
  {
    accessor: "Actions",
    textAlign: "right",
    render: ({ action }: EmployeeAssignmentTableData) => {
      return (
        action && (
          <Group justify="flex-end">
            <Checkbox
              checked={!!action.find((item) => item.name === "create")}
              label="Add"
              onChange={() => {}}
            />
            <Checkbox
              checked={!!action.find((item) => item.name === "read")}
              label="View"
              onChange={() => {}}
            />
            <Checkbox
              checked={!!action.find((item) => item.name === "update")}
              label="Update"
              onChange={() => {}}
            />
            <Checkbox
              checked={!!action.find((item) => item.name === "delete")}
              label="Delete"
              onChange={() => {}}
            />
          </Group>
        )
      );
    },
  },
];

type EmployeeAssignmentListProps = {};

const EmployeeAssignmentList = ({}: EmployeeAssignmentListProps) => {
  const { client } = useClientContext();
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isLoading } = useEmployeeAssignmentByEmployeeQuery(
    client?.id as string
  );

  return (
    <Fragment>
      <Modal opened={opened} onClose={close} title="Add New Assignment">
        <EmployeeAssignmentForm close={close} />
      </Modal>
      <HeadingBar
        title="Employee Assignment"
        description="List of all the clients and projects assigned to this user."
        button={{ children: "Add New Assignment", onClick: open }}
      />
      <Table columns={columns} data={data} fetching={isLoading} />
    </Fragment>
  );
};

export default EmployeeAssignmentList;
