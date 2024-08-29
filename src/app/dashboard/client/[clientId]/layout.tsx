import ClientProvider from "@/context/client-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <ClientProvider>{children}</ClientProvider>
    </main>
  );
}
