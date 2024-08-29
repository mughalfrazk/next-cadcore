import { Fragment, useEffect } from "react";
import { Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconPresentation } from "@tabler/icons-react";

import HeadingBar from "@/components/common/HeadingBar";
import FileStructure from "@/components/common/Tree";
import FileUpload from "@/components/files/FileUpload";
import FileLeaf from "@/components/files/FileLeaf";
import { getProfileByIdApi } from "@/lib/supabase/profiles";
import { getProjectDetailWithFilesTreeByIdApi } from "@/lib/supabase/project";

const ClientProject = async ({
  params,
}: {
  params: { clientId: string; projectId: string };
}) => {
  const { clientId, projectId } = params;
  const client = await getProfileByIdApi(clientId);
  const { project, fileTreeData } = await getProjectDetailWithFilesTreeByIdApi(
    +projectId
  );

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
      <FileUpload client={client} projectId={+projectId} />
      <HeadingBar
        mt={30}
        title="Project Files"
        description="List of all the files in the project."
      />
      <FileStructure data={fileTreeData} renderNode={FileLeaf} />
    </Fragment>
  );
};

export default ClientProject;
