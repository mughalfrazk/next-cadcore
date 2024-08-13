"use client"

import { clientApi } from "@/lib/supabase/clientApi";
import { Group, rem, RenderTreeNodePayload } from "@mantine/core";
import { IconFile3d } from "@tabler/icons-react";

const Leaf = ({ node }: RenderTreeNodePayload) => {
  const onItemClick = async () => {
    const { data } = await clientApi()
      .storage.from("client_files")
      .download("client@gmail.com/1033561.jpg");
    console.log(data);
  };

  return (
    <Group onClick={onItemClick}>
      <IconFile3d stroke={1.6} style={{ width: rem(22), height: rem(22) }} />
      {node.label}
    </Group>
  );
};

export default Leaf;
