"use client"

import { Box, Text, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";

const Dashboard = () => {
  const theme = useMantineTheme()
  useEffect(() => {
    // console.log("theme: ", theme)
  }, [theme])

  return (
    <Box>
      <Text>Hello me.profile.email</Text>
    </Box>
  );
};

export default Dashboard;
