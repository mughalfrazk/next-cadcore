import { Box, Group, Text } from "@mantine/core";

import AddUserDialog from "@/components/users/AddUserDialog";
import UsersTable from "@/components/users/UsersTable";
import { getClientListApi } from "@/lib/supabase/profiles";

const Users = async () => {
  const result = await getClientListApi();

  return (
    <Box>
      <AddUserDialog />
      <UsersTable users={result} />
    </Box>
  );
};

export default Users;
