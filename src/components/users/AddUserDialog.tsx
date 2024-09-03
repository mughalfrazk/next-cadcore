"use client";

import { Fragment } from "react";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import AddUserForm from "./AddUserForm";
import HeadingBar from "../common/HeadingBar";

type AddUserDialogProps = {
  title: string;
  description: string;
};

const AddUserDialog = ({ title, description }: AddUserDialogProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Fragment>
      <Modal opened={opened} onClose={close} title="Add New User">
        <AddUserForm closeModal={close} />
      </Modal>
      <HeadingBar
        title={title}
        description={description}
        button={{ size: "lg", children: "Add New User", onClick: open }}
      />
    </Fragment>
  );
};

export default AddUserDialog;
