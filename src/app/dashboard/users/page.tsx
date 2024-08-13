import { Box, Group, Text } from "@mantine/core";

import { getEmployeesListApi } from "@/lib/supabase/profiles";
import AddUserDialog from "@/components/users/AddUserDialog";
import UsersTable from "@/components/users/UsersTable";

const Users = async () => {
  const result = await getEmployeesListApi();

  return (
    <Box>
      <Group justify="space-between" mb={10}>
        <Text>Employees List</Text>
        <AddUserDialog />
      </Group>

      <UsersTable users={result} />
    </Box>
  );
};

export default Users;