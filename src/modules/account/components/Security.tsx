'use client';

import {
  Box,
  Card,
  Divider,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconChevronRight,
  IconFileText,
  IconLock,
  IconRefresh,
  IconShield,
} from '@tabler/icons-react';
import { useRecentActivity } from '../hooks/useAccount';

export default function Security() {
  const recentActivity = useRecentActivity();
  return (
    <Grid>
      <Grid.Col span={6}>
        <Paper withBorder radius="md" p={32} h="100%">
          <Stack>
            <Group>
              <IconLock size={22} color="var(--mantine-primary-color-filled)" />
              <Title order={3}>Bảo mật tài khoản</Title>
            </Group>

            <Card withBorder radius="md">
              <Group justify="space-between">
                <Group>
                  <Text fw={600}>***</Text>
                  <Text>Đổi mật khẩu</Text>
                </Group>
                <IconChevronRight size={18} />
              </Group>
            </Card>

            <Card withBorder radius="md">
              <Group justify="space-between">
                <Group>
                  <IconShield size={20} />
                  <Box>
                    <Text>Xác thực hai yếu tố</Text>
                    <Text size="xs" c="teal">
                      Đã bật • An toàn
                    </Text>
                  </Box>
                </Group>

                <Text c="brand" size="sm" style={{ cursor: 'pointer', fontWeight: 600 }}>
                  Quản lý
                </Text>
              </Group>
            </Card>
          </Stack>
        </Paper>
      </Grid.Col>

      <Grid.Col span={6}>
        <Paper withBorder radius="md" p={32} h="100%">
          <Stack>
            <Group>
              <IconRefresh size={22} color="var(--mantine-primary-color-filled)" />
              <Title order={3}>Hoạt động gần đây</Title>
            </Group>

            {recentActivity.map(([action, title, meta], index) => (
              <Box key={title}>
                <Group>
                  <ThemeIcon variant="light" color={index === 2 ? 'orange' : 'brand'} size="lg">
                    <IconFileText size={18} />
                  </ThemeIcon>

                  <Box>
                    <Text size="sm">
                      {action}{' '}
                      <Text span fw={700}>
                        {title}
                      </Text>
                    </Text>
                    <Text size="xs" c="dimmed">
                      {meta}
                    </Text>
                  </Box>
                </Group>

                {index !== 2 && <Divider my="sm" />}
              </Box>
            ))}
          </Stack>
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
