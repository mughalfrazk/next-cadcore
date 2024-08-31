import { Card } from "@mantine/core";

import Viewer from "@/components/viewer/three-viewer";

type ViewerProps = {
  searchParams: {
    client: string;
    file: string;
  };
};

const ViewerPage = async ({ searchParams: { client, file } }: ViewerProps) => {
  return (
    <Card withBorder h="calc(100vh - 60px)" m={30} shadow="lg" p={0}>
      <Viewer modelPath={`${client}/${file}`} />
    </Card>
  );
};

export default ViewerPage;
