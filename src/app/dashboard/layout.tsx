import { Box } from "@mantine/core";

import ViewerProvider from "@/context/viewer-context";
import ConditionalLayout from "./conditional-layout";
import withAuth from "@/components/hoc/with-auth";
import ClientProvider from "@/context/client-context";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <ConditionalLayout>
        <ClientProvider>
          <ViewerProvider>
            <Box>{children}</Box>
          </ViewerProvider>
        </ClientProvider>
      </ConditionalLayout>
    </main>
  );
};

export default withAuth(RootLayout);
