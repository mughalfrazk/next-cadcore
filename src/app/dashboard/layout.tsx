import { Box } from "@mantine/core";
import MainLayout from "@/components/layout/appShell";
import ViewerProvider from "@/context/viewer-context";
import ConditionalLayout from "./conditional-layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <ConditionalLayout>
        <ViewerProvider>
          <Box>{children}</Box>
        </ViewerProvider>
      </ConditionalLayout>
    </main>
  );
}
