"use client";

import { Fragment } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

import HeadingBar from "../common/HeadingBar";
import AddProjectForm from "./AddProjectForm";
import ProjectTable from "./ProjectTable";
import { ProfileModel } from "@/lib/models/Profile";

type ProjectListProps = {
  client: ProfileModel
}

const ProjectList = ({ client }: ProjectListProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  if (!client) return 

  return (
    <Fragment>
      <Modal opened={opened} onClose={close} title="Add New Project">
        <AddProjectForm closeModal={close} />
      </Modal>
      <HeadingBar
        title="Project List"
        description="List of all the project of the client."
        button={{ children: "Create new project", onClick: open }}
      />
      <ProjectTable clientId={client.id} />
    </Fragment>
  );
};

export default ProjectList;
