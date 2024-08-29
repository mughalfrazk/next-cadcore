"use client";

import { usePathname } from "next/navigation";
import { Badge, Group, rem, RenderTreeNodePayload, Text } from "@mantine/core";
import { IconCube } from "@tabler/icons-react";
import Link from "next/link";

import classes from "./FileLeaf.module.css";

const FileLeaf = ({ node }: RenderTreeNodePayload) => {
  const pathname = usePathname();

  const getStatusColor = (status: string) => {
    return status === "initial_draft"
      ? "red"
      : status === "in_progress"
      ? "blue.5"
      : status === "completed"
      ? "primary.9"
      : "";
  };

  return (
    <Link className={classes.link} href={`${pathname}/viewer/${node.label}`}>
      <Group justify="space-between" align="center">
        <Group>
          <IconCube
            stroke={2}
            style={{ width: rem(20), height: rem(20) }}
            color="var(--mantine-color-primary-9)"
          />
          {node.label}{" "}
          <Badge size="sm" color={getStatusColor(node.nodeProps?.file_status.name)}>
            {node.nodeProps?.file_status.name.replace("_", " ")}
          </Badge>
        </Group>
        <Text size="sm" c="var(--mantine-color-grey-3)">
          {node.nodeProps?.created_at.split("T")[0]}
        </Text>
      </Group>
    </Link>
  );
};

export default FileLeaf;
