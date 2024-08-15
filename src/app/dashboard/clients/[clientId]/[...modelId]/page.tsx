import { getProfileByIdApi } from "@/lib/supabase/profiles";
import { notFound } from "next/navigation";
import { Card } from "@mantine/core";

import Viewer from "@/components/viewer";

type ViewerProps = {
  params: {
    clientId: string;
    modelId: string[];
  };
};

const ViewerPage = async ({ params }: ViewerProps) => {
  const { clientId, modelId } = params;
  if (modelId.length !== 2 || modelId[0] !== "viewer") notFound();
  const user = await getProfileByIdApi(clientId)

  return <Card withBorder h="calc(100vh - 60px)" m={30} shadow="lg" p={0}>
    <Viewer modelPath={`${user.email}/${modelId[1]}`} />
  </Card>
};

export default ViewerPage;
