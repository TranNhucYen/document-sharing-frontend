'use client';

import { Box, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { IconBell, IconInfoCircle, IconAlertTriangle, IconCheck } from '@tabler/icons-react';
import { useNotifications, type NotificationItem } from '../hooks/useAccount';

const iconMap: Record<NotificationItem['type'], typeof IconCheck> = {
  success: IconCheck,
  info: IconInfoCircle,
  warning: IconAlertTriangle,
};

const colorMap: Record<NotificationItem['type'], string> = {
  success: 'teal',
  info: 'brand',
  warning: 'orange',
};

export default function Notification() {
  const notifications = useNotifications();

  return (
    <Paper withBorder radius="md" p={32}>
      <Stack>
        <Group>
          <IconBell size={22} color="var(--mantine-primary-color-filled)" />
          <Title order={3}>Thông báo</Title>
        </Group>

        <Text size="sm" c="dimmed">
          Theo dõi hoạt động tài liệu và cập nhật tài khoản của bạn.
        </Text>

        {notifications.length === 0 ? (
          <Text c="dimmed" ta="center" py="xl">
            Chưa có thông báo nào
          </Text>
        ) : (
          notifications.map((notification) => {
            const Icon = iconMap[notification.type];
            const color = colorMap[notification.type];
            return (
              <Paper
                key={notification.id}
                withBorder
                radius="md"
                p="md"
                shadow="sm"
                style={{
                  borderLeft: `4px solid var(--mantine-color-${color}-filled)`,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.boxShadow = 'var(--mantine-shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'var(--mantine-shadow-sm)';
                }}
              >
                <Group>
                  <Box c={color === 'brand' ? 'var(--mantine-primary-color-filled)' : color}>
                    <Icon size={24} />
                  </Box>
                  <Box style={{ flex: 1 }}>
                    <Group justify="space-between">
                      <Text fw={600}>{notification.title}</Text>
                      <Text size="xs" c="dimmed">
                        {notification.time}
                      </Text>
                    </Group>
                    <Text size="sm" c="dimmed" mt={4}>
                      {notification.content}
                    </Text>
                  </Box>
                </Group>
              </Paper>
            );
          })
        )}
      </Stack>
    </Paper>
  );
}
