import { Box, Loader } from "@mantine/core";

const AuthLoading = () => {
  return (
    <Box
      h={"100%"}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader size="xl" />
    </Box>
  );
};

export default AuthLoading;
