import { Box } from "@mantine/core";
import MainLayout from "@/components/layout/appShell";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <MainLayout>
        <Box>{children}</Box>
      </MainLayout>
    </main>
  );
}
