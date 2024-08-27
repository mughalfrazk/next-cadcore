import { Box } from "@mantine/core";

import Slider from "@/components/home/Slider";
import PublicHeader from "@/components/common/PublicHeader";
import { createClient } from "@/utils/supabase/server";
import classes from "./page.module.css";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <main className={classes.main}>
      <PublicHeader user={data?.user} />
      <Box pt={60}>
        {/* <Slider /> */}
        <h1>Hello Homepage</h1>
        <h1>Hello Homepage</h1>
        <h1>Hello Homepage</h1>
        <h1>Hello Homepage</h1>
        <h1>Hello Homepage</h1>
        <h1>Hello Homepage</h1>
        <h1>Hello Homepage</h1>
        <h1>Hello Homepage</h1>
        <h1>Hello Homepage</h1>
        <h1>Hello Homepage</h1>
        <h1>Hello Homepage</h1>
        <h1>Hello Homepage</h1>
        <h1>Hello Homepage</h1>
        <h1>Hello Homepage</h1>
        <h1>Hello Homepage</h1>
        <h1>Hello Homepage</h1>
        <h1>Hello Homepage</h1>
      </Box>
    </main>
  );
}
