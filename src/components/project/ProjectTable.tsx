"use client";

import { Badge } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";

import Table from "@/components/common/Table";
import { ProjectModel } from "@/lib/models/Project";
import { useProjectByClientQuery } from "@/hooks/query/client";

type ProjectTableProps = {
  clientId: string;
};

const ProjectTable = ({ clientId }: ProjectTableProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: projectsList, isLoading } = useProjectByClientQuery(clientId)

  const getStatusColor = (status: string) => {
    return status === "planning"
      ? "red"
      : status === "in_progress"
      ? "blue.5"
      : status === "in_review"
      ? "lime.8"
      : status === "completed"
      ? "var(--mantine-color-primary-7)"
      : "";
  };

  const columns = [
    {
      accessor: "name",
    },
    {
      title: "Project Status",
      accessor: "status",
      render: ({ project_status }: ProjectModel) => {
        return (
          <Badge size="sm" color={getStatusColor(project_status?.name)}>
            {project_status?.name?.replace("_", " ")}
          </Badge>
        );
      },
    },
    {
      title: "No. of files",
      accessor: "project_file",
      render: ({ project_file }: ProjectModel) => {
        return project_file?.length;
      },
    },
    {
      accessor: "created_at",
      textAlign: "right",
      render: ({ created_at }: ProjectModel) => {
        return created_at?.split("T")[0];
      },
    },
  ];

  const goToDetailPage = ({ record }: any) => {
    router.push(`${pathname}/project/${record.id}`);
  };

  return (
    <Table
      columns={columns}
      data={projectsList}
      onRowClick={goToDetailPage}
      fetching={isLoading}
    />
  );
};

export default ProjectTable;
