"use client";

import { Fragment } from "react";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import AddUserForm from "./AddUserForm";
import HeadingBar from "../common/HeadingBar";

const AddUserDialog = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Fragment>
      <Modal opened={opened} onClose={close} title="Add New User">
        <AddUserForm closeModal={close} />
      </Modal>
      <HeadingBar
        title="Clients"
        description="List of all the clients of Cadcore"
        button={{ size: "lg", children: "Add New User", onClick: open }}
      />
    </Fragment>
  );
};

export default AddUserDialog;
