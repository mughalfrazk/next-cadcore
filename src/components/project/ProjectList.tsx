"use client";

import { Fragment } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

import HeadingBar from "../common/HeadingBar";
import AddProjectForm from "./AddProjectForm";
import { ProfileModel } from "@/lib/models/Profile";
import ProjectTable from "./ProjectTable";

type ProjectListProps = {
  client: ProfileModel;
};

const ProjectList = ({ client }: ProjectListProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Fragment>
      <Modal opened={opened} onClose={close} title="Add New Project">
        <AddProjectForm client={client} closeModal={close} />
      </Modal>
      <HeadingBar
        mt={30}
        title="Project Files"
        description="List of all the project files of the client."
        button={{ children: "Create new project", onClick: open }}
      />
      <ProjectTable clientId={client.id} />
    </Fragment>
  );
};

export default ProjectList;
