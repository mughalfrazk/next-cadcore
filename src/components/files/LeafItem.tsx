"use client";

import { usePathname } from "next/navigation";
import { Group, rem, RenderTreeNodePayload, Text } from "@mantine/core";
import { IconCube } from "@tabler/icons-react";
import Link from "next/link";

import classes from "./LeafItem.module.css";

const Leaf = ({ node }: RenderTreeNodePayload) => {
  const pathname = usePathname();

  return (
    <Link className={classes.link} href={`${pathname}/viewer/${node.label}`}>
      <Group justify="space-between" align="center">
        <Group>
          <IconCube
            stroke={2}
            style={{ width: rem(20), height: rem(20) }}
            color="var(--mantine-color-primary-9)"
          />
          {node.label}
        </Group>
        <Text size="sm" c="var(--mantine-color-grey-3)">
          {node.nodeProps?.metadata?.lastModified.split("T")[0]}
        </Text>
      </Group>
    </Link>
  );
};

export default Leaf;
