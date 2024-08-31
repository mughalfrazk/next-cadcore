import { Fragment, useEffect } from "react";
import { Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconPresentation } from "@tabler/icons-react";

import HeadingBar from "@/components/common/HeadingBar";
import FileStructure from "@/components/common/Tree";
import FileUpload from "@/components/files/FileUpload";
import FileLeaf from "@/components/files/FileLeaf";
import { getProfileByIdApi } from "@/lib/supabase/profiles";
import { getProjectDetailWithFilesTreeByIdApi } from "@/lib/supabase/project";
import ProjectPage from "@/components/project/ProjectPage";

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
    <ProjectPage
      client={client}
      project={project}
      fileTreeData={fileTreeData}
    />
  );
};

export default ClientProject;
