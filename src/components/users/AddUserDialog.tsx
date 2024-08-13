"use client";

import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Fragment } from "react";
import CButton from "@/components/core/CButton";
import AddUserForm from "./AddUserForm";

const AddUserDialog = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Fragment>
      <Modal opened={opened} onClose={close} title="Add New User">
        <AddUserForm closeModal={close} />
      </Modal>
      <CButton size="md" onClick={open}>
        Add New User
      </CButton>
    </Fragment>
  );
};

export default AddUserDialog;
