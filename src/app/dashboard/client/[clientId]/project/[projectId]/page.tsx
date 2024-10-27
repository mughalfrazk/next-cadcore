import { getProjectDetailWithFilesTreeByIdApi } from "@/lib/supabase/project.service";
import { getProfileByIdApi } from "@/lib/supabase/profiles.service";
import ClientContextWrapper from "@/components/client/ClientContextWrapper";
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
    <ClientContextWrapper client={client}>
      <ProjectPage
        client={client}
        project={project}
        fileTreeData={fileTreeData}
      />
    </ClientContextWrapper>
  );
};

export default ClientProject;
