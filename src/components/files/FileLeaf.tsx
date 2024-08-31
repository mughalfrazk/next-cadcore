"use client";

import { Badge, Group, rem, RenderTreeNodePayload, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconCube } from "@tabler/icons-react";

import { useClientContext } from "@/context/client-context";
import { useViewerContext } from "@/context/viewer-context";

const FileLeaf = ({ node }: RenderTreeNodePayload) => {
  const { client } = useClientContext();
  const router = useRouter();

  const getStatusColor = (status: string) => {
    return status === "initial_draft"
      ? "red"
      : status === "in_progress"
      ? "blue.5"
      : status === "completed"
      ? "primary.9"
      : "";
  };

  const onFileClick = () => {
    router.push(`/dashboard/viewer?client=${client?.email}&file=${node.value}`);
  };

  return (
    <Group justify="space-between" align="center" onClick={onFileClick}>
      <Group>
        <IconCube
          stroke={2}
          style={{ width: rem(20), height: rem(20) }}
          color="var(--mantine-color-primary-9)"
        />
        {node.label}{" "}
        <Badge
          size="sm"
          color={getStatusColor(node.nodeProps?.file_status.name)}
        >
          {node.nodeProps?.file_status.name.replace("_", " ")}
        </Badge>
      </Group>
      <Text size="sm" c="var(--mantine-color-grey-3)">
        {node.nodeProps?.created_at.split("T")[0]}
      </Text>
    </Group>
  );
};

export default FileLeaf;
