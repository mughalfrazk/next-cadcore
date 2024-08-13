import { Box, Text } from "@mantine/core";

import withAuth, { AuthHocProps } from "@/components/hoc/with-auth";

const Dashboard = ({ me }: AuthHocProps) => {
  return (
    <Box>
      <Text>Hello {me.email}</Text>
    </Box>
  );
};

export default withAuth(Dashboard);
8;
