import { Text } from "@mantine/core";
import Link from "next/link";

import LoginForm from "@/components/auth/LoginForm";
import CadcoreLogo from "@/components/icons/CadcoreLogo";
import classes from "./page.module.css";

export default function LoginPage() {
  return (
    <>
      <CadcoreLogo h={80} m="0 auto 2rem" />
      <LoginForm />
      <Text ta="center" mt="sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className={classes.link}>
          Register
        </Link>
      </Text>
    </>
  );
}
