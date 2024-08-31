import { Box } from "@mantine/core";

import Slider from "@/components/home/Slider";
import PublicHeader from "@/components/common/PublicHeader";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <main>
      <PublicHeader user={data?.user} />
      <Box>
        <Slider />
      </Box>
    </main>
  );
}
