"use client";

import { usePathname } from "next/navigation";
import { Group, rem, RenderTreeNodePayload } from "@mantine/core";
import { IconCube } from "@tabler/icons-react";
import Link from "next/link";

import classes from "./LeafItem.module.css";

const Leaf = ({ node }: RenderTreeNodePayload) => {
  const pathname = usePathname();

  return (
    <Link className={classes.link} href={`${pathname}/viewer/${node.label}`}>
      <Group>
        <IconCube
          stroke={2}
          style={{ width: rem(20), height: rem(20) }}
          color="var(--mantine-color-primary-9)"
        />
        {node.label}
      </Group>
    </Link>
  );
};

export default Leaf;
