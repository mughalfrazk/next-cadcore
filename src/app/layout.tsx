import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "mantine-datatable/styles.layer.css";
import "@mantine/dropzone/styles.css";

import localFont from "next/font/local";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { cadcoreTheme } from "@/styles/cadcore-theme";
import { Notifications } from "@mantine/notifications";

const conthraxFont = localFont({
  src: "../styles/fonts/conthrax-sb.woff",
  display: "swap",
});

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
    <html lang="en" className={`${conthraxFont.className} font-sans`}>
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
