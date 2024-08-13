"use client";

import { Badge } from "@mantine/core";
import { usePathname, redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ProfileListModel, ProfileModel } from "@/lib/models/Profile";
import Table from "@/components/common/Table";

type UsersTableProps = {
  users: ProfileListModel;
};

const UsersTable = ({ users }: UsersTableProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const getRoleColor = (role: string) => {
    return role === "employee" ? "blue" : role === "client" ? "lime.7" : "";
  };

  useEffect(() => {
    console.log("pathname: ", pathname);
  }, []);

  const columns = [
    {
      accessor: "name",
      render: ({ first_name, last_name }: ProfileModel) => {
        return `${first_name} ${last_name}`;
      },
    },
    {
      accessor: "email",
    },
    {
      accessor: "role",
      render: ({ role }: ProfileModel) => {
        return (
          <Badge size="sm" color={getRoleColor(role.name)}>
            {role.name}
          </Badge>
        );
      },
    },
    {
      accessor: "created_at",
      textAlign: "right",
      render: ({ created_at }: ProfileModel) => {
        return created_at.split("T")[0];
      },
    },
  ];

  const goToDetailPage = ({ record }: any) => {
    router.push(`${pathname}/${record.id}`);
  };

  return <Table columns={columns} data={users} onRowClick={goToDetailPage} />;
};

export default UsersTable;