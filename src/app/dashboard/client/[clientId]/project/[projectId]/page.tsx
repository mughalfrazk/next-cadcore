import FileStructure from "@/components/common/Tree";
import FileUpload from "@/components/files/FileUpload";
import { uploadFileApi } from "@/lib/supabase/files";
import { getProfileByIdApi } from "@/lib/supabase/profiles";

const ClientProject = async ({ params }: { params: { clientId: string } }) => {
  const client = await getProfileByIdApi(params.clientId);

  return <FileUpload client={client} />;
  // return <FileStructure data={} />;
};

export default ClientProject;
