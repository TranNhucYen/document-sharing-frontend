import '@mantine/core/styles.css';
import './global.css';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import React from 'react';
import { theme } from '@/theme';

export const metadata = {
  title: 'DocShare - Chia sẻ tài liệu',
  description: 'Nền tảng chia sẻ tài liệu trực tuyến',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="vi" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
