"use client";

import { Fragment, useEffect } from "react";
import {
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
  TreeNodeData,
} from "@mantine/core";
import { IconPresentation } from "@tabler/icons-react";

import Tree from "@/components/common/Tree";
import HeadingBar from "@/components/common/HeadingBar";
import FileUpload from "@/components/files/FileUpload";
import FileLeaf from "@/components/files/FileLeaf";
import { ProfileModel } from "@/lib/models/Profile";
import { ProjectWithFilesModel } from "@/lib/models/Project";

const ProjectPage = ({
  client,
  project,
  fileTreeData,
}: {
  client: ProfileModel;
  project: ProjectWithFilesModel;
  fileTreeData: TreeNodeData[];
}) => {
  return (
    <Fragment>
      <Group mb={20}>
        <ThemeIcon size="xl">
          <IconPresentation size={30} />
        </ThemeIcon>
        <Stack align="flex-start" gap={0}>
          <Title order={4}>{project.name}</Title>
          <Text size="sm">{project.description}</Text>
        </Stack>
      </Group>
      <FileUpload client={client} projectId={project.id} />
      <HeadingBar
        mt={30}
        title="Project Files"
        description="List of all the files in the project."
      />
      <Tree data={fileTreeData} renderNode={FileLeaf} />
    </Fragment>
  );
};

export default ProjectPage;
