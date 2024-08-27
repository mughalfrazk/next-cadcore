"use client";

import { Badge } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";

import Table from "@/components/common/Table";
import { useEffect, useState } from "react";
import { getProjectListByClientApi } from "@/lib/supabase/project";
import { ProjectListModel, ProjectModel } from "@/lib/models/Project";

type ProjectTableProps = {
  clientId: string;
};

const ProjectTable = ({ clientId }: ProjectTableProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [projects, setProjects] = useState<ProjectListModel>([]);

  const getStatusColor = (status: string) => {
    return status === "planning"
      ? "red"
      : status === "in_progress"
      ? "blue.5"
      : status === "in_review"
      ? "lime.8"
      : status === "completed"
      ? "primary.9"
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
          <Badge size="sm" color={getStatusColor(project_status.name)}>
            {project_status.name.replace("_", " ")}
          </Badge>
        );
      },
    },
    {
      accessor: "created_at",
      textAlign: "right",
      render: ({ created_at }: ProjectModel) => {
        return created_at.split("T")[0];
      },
    },
  ];

  const goToDetailPage = ({ record }: any) => {
    router.push(`${pathname}/project/${record.id}`);
  };

  const getProjectList = async () => {
    const data = await getProjectListByClientApi(clientId);
    console.log(data);
    setProjects(data);
  };

  useEffect(() => {
    if (clientId) getProjectList();
  }, [clientId]);

  return (
    <Table columns={columns} data={projects}  onRowClick={goToDetailPage} />
  );
};

export default ProjectTable;
