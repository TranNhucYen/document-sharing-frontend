'use client';

import { Box, Flex, Paper, Stack, Text, Title } from '@mantine/core';
import Logo from '@/components/Logo';

interface Props {
  leftTitle: string;
  leftDescription: string;
  formTitle: string;
  formDescription: string;
  bottomText: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthShell({
  leftTitle,
  leftDescription,
  formTitle,
  formDescription,
  bottomText,
  children,
}: Props) {
  return (
    <Flex mih="100vh">
      <Box
        style={{
          flex: 1,
          background: 'var(--mantine-color-brand-9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
          position: 'relative',
          overflow: 'hidden',
        }}
        visibleFrom="md"
      >
        <Box
          style={{
            position: 'absolute',
            top: '-30%',
            right: '-20%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'var(--mantine-color-brand-7)',
            opacity: 0.3,
          }}
        />
        <Box
          style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'var(--mantine-color-brand-6)',
            opacity: 0.2,
          }}
        />
        <Stack align="center" gap="lg" style={{ position: 'relative', zIndex: 1 }}>
          <Logo h={48} />
          <Title order={1} ta="center" c="white" fz={32}>
            {leftTitle}
          </Title>
          <Text ta="center" c="gray.4" maw={360}>
            {leftDescription}
          </Text>
        </Stack>
      </Box>

      <Box
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
          background: 'var(--mantine-color-brand-0)',
        }}
      >
        <Paper withBorder radius="md" p="xl" maw={420} w="100%">
          <Stack align="center" mb="lg">
            <Box hiddenFrom="md">
              <Logo h={32} />
            </Box>
            <Title order={2}>{formTitle}</Title>
            <Text c="dimmed" size="sm" ta="center">
              {formDescription}
            </Text>
          </Stack>

          {children}

          <Text ta="center" size="sm" mt="lg">
            {bottomText}
          </Text>
        </Paper>
      </Box>
    </Flex>
  );
}
