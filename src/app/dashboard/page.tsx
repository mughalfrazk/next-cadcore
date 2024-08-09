import { Box, Text } from "@mantine/core";

import withAuth, { AuthHocProps } from "@/components/hoc/with-auth";
import Table from "@/components/common/Table";

const Dashboard = ({ me }: AuthHocProps) => {
  return (
    <Box>
      <Text>Hello {me.email}</Text>
      <Table />
    </Box>
  );
};

export default withAuth(Dashboard);
8;
