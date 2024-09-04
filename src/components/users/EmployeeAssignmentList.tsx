"use client";

import { Fragment, MouseEvent } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Checkbox, Group, Modal } from "@mantine/core";

import { useClientContext } from "@/context/client-context";
import { useEmployeeAssignmentByEmployeeQuery } from "@/hooks/query/employee-assignment";
import { EmployeeAssignmentTableData } from "@/lib/models/EmployeeAssignment";
import EmployeeAssignmentForm from "./EmployeeAssignmentForm";
import HeadingBar from "../common/HeadingBar";
import Table from "../common/Table";
import EmployeeAssignmentActionCell from "./EmployeeAssignmentActionCell";
import { DataTableRowClickHandler } from "mantine-datatable";

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
    render: EmployeeAssignmentActionCell,
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
      <Table
        columns={columns}
        data={data}
        fetching={isLoading}
        onRowClick={({ event }) => {
          event.stopPropagation();
        }}
      />
    </Fragment>
  );
};

export default EmployeeAssignmentList;
