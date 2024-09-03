import { Box } from "@mantine/core";

import AddUserDialog from "@/components/users/AddUserDialog";
import UsersTable from "@/components/users/UsersTable";
import { getClientListApi } from "@/lib/supabase/profiles";

const Users = async () => {
  const clients = await getClientListApi();

  return (
    <Box>
      <AddUserDialog title="Clients" description="List of all the cadcore clients" />
      <UsersTable users={clients} />
    </Box>
  );
};

export default Users;
