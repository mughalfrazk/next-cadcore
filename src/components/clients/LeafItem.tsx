"use client";

import { useContext, useState } from "react";
import { Group, Loader, rem, RenderTreeNodePayload } from "@mantine/core";
import { IconCube } from "@tabler/icons-react";

import { ViewerContext } from "@/context/viewer-context";
import { getFileDetailByPathApi } from "@/lib/supabase/client/files";

const Leaf = ({ node }: RenderTreeNodePayload) => {
  const { setFileName, setBuffers } = useContext(ViewerContext);
  const [loading, setLoading] = useState<boolean>(false);

  const onItemClick = async () => {
    if (!node.label) return;
    const fileName = node.label as string;
    try {
      setLoading(true);
      const result = await getFileDetailByPathApi(
        `client@gmail.com/${fileName}`
      );
      console.log(result);

      setFileName(fileName);
      setBuffers(result);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Group onClick={onItemClick}>
      {loading ? (
        <Loader size="xs" type="oval" />
      ) : (
        <IconCube
          stroke={2}
          style={{ width: rem(20), height: rem(20) }}
          color="var(--mantine-color-primary-9)"
        />
      )}
      {node.label}
    </Group>
  );
};

export default Leaf;
