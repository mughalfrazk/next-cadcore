import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "mantine-datatable/styles.layer.css";
import "@mantine/dropzone/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { cadcoreTheme } from "@/styles/cadcore-theme";
import { Notifications } from "@mantine/notifications";

export const metadata = {
  title: "Cadcore",
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
        <link
          rel="preload"
          href="/fonts/ConthraxSb-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
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
