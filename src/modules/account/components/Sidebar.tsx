'use client';

import { Box, Group, Paper, Stack, Text, Title, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNavItems } from '../hooks/useAccount';
import classes from './Sidebar.module.css';

export default function Sidebar() {
  const navItems = useNavItems();
  const pathname = usePathname();

  return (
    <Paper withBorder radius="md" p={0} h="100%">
      <Stack gap={0}>
        <Box p="md">
          <Title order={3} size="h4">
            Tài khoản và cài đặt
          </Title>
       
        </Box>

        <Stack gap={4} p="xs">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <UnstyledButton
                key={item.label}
                component={Link}
                href={item.href}
                className={`${classes.button} ${active ? classes.active : ''}`}
              >
                <Group gap="sm">
                  <item.icon
                    size={18}
                    style={{
                      color: active ? 'var(--mantine-primary-color-filled)' : 'var(--mantine-color-dimmed)',
                    }}
                  />
                  <Text size="sm" style={{ fontWeight: active ? 600 : 500 }}>{item.label}</Text>
                </Group>
              </UnstyledButton>
            );
          })}
        </Stack>
      </Stack>
    </Paper>
  );
}
