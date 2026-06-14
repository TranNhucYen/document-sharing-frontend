'use client';

import { createTheme, Text, Paper } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: [
      '#F4F5F6', // 0
      '#E4E6E9', // 1
      '#Caced4', // 2
      '#AEB4BE', // 3
      '#8D96A4', // 4
      '#697384', // 5
      '#23272f', // 6 - Primary brand color (in light mode)
      '#1E2128', // 7
      '#171A20', // 8
      '#0E1013', // 9
    ],
  },
  shadows: {
    xs: '0 1px 2px rgba(0,0,0,0.04)',
    sm: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
    md: '0 4px 6px -1px rgba(0,0,0,0.06), 0 2px 4px -1px rgba(0,0,0,0.03)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.03)',
    xl: '0 20px 25px -5px rgba(0,0,0,0.10), 0 10px 10px -5px rgba(0,0,0,0.04)',
  },
  defaultRadius: 'md',
  components: {
    Text: Text.extend({
      defaultProps: {
        size: 'md',
      },
    }),
    Paper: Paper.extend({
      defaultProps: {
        p: 'sm',
        shadow: 'sm',
        withBorder: true,
      },
    }),
  },
});

