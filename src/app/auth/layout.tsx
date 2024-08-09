import { Paper, Box } from "@mantine/core";
import classes from "./page.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        {children}
      </Paper>
    </Box>
  );
}
