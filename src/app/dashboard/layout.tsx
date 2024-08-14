import { Box } from "@mantine/core";
import MainLayout from "@/components/layout/appShell";
import ViewerProvider from "@/context/viewer-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <MainLayout>
        <ViewerProvider>
          <Box>{children}</Box>
        </ViewerProvider>
      </MainLayout>
    </main>
  );
}
