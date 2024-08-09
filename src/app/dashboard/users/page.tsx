import Table from "@/components/common/Table";
import CButton from "@/components/core/CButton";
import { Box, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const Users = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box>
      <Modal opened={opened} onClose={close} title="Add New User"></Modal>
      <Group justify="space-between" mb={10}>
        <Text>User List</Text>
        {/* <CButton size="md" onClick={open}>Add New User</CButton> */}
      </Group>
      <Table />
    </Box>
  );
};

export default Users;
