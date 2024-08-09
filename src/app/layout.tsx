// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import 'mantine-datatable/styles.layer.css';

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { cadcoreTheme } from "@/styles/cadcore-theme";
import { Notifications } from "@mantine/notifications";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="light" theme={cadcoreTheme}>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
