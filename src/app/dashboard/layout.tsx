import { Box } from "@mantine/core";

import ViewerProvider from "@/context/viewer-context";
import ConditionalLayout from "./conditional-layout";
import withAuth from "@/components/hoc/with-auth";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <ConditionalLayout>
        <ViewerProvider>
          <Box>{children}</Box>
        </ViewerProvider>
      </ConditionalLayout>
    </main>
  );
};

export default withAuth(RootLayout);
