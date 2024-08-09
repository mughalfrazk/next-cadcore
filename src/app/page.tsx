"use client";

import Link from "next/link";

import CButton from "@/components/core/CButton";
import Slider from "@/components/home/Slider";
import classes from "./page.module.css";

export default function Home() {
  return (
    <main className={classes.main}>
      {/* <Slider /> */}
      <Link href="/auth">
        <CButton>Go to Login</CButton>
      </Link>
      {/* <CButton type="submit" onClick={getMyProfileApi}>
        Get Role
      </CButton> */}
    </main>
  );
}
