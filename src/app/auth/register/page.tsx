import { Text } from "@mantine/core";
import Link from "next/link";

import CadcoreLogo from "@/components/icons/CadcoreLogo";
import RegisterForm from "@/components/auth/register-form";
import classes from "../page.module.css";

const LoginPage = () => {
  return (
    <>
      <CadcoreLogo h={80} m="0 auto 2rem" />
      <RegisterForm />
      <Text ta="center" mt="sm">
        Already have an account?{" "}
        <Link href="/auth" className={classes.link}>
          Login
        </Link>
      </Text>
    </>
  );
};

export default LoginPage;
