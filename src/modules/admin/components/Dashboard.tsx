'use client';

import { Card, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconFileDescription, IconFileCheck, IconFileX, IconClock } from '@tabler/icons-react';
import { useAdminStats } from '../hooks/useAdmin';

const statCards = [
  { label: 'Tổng tài liệu', color: 'blue', icon: IconFileDescription, key: 'total' as const },
  { label: 'Chờ duyệt', color: 'yellow', icon: IconClock, key: 'pending' as const },
  { label: 'Đã duyệt', color: 'green', icon: IconFileCheck, key: 'approved' as const },
  { label: 'Từ chối', color: 'red', icon: IconFileX, key: 'rejected' as const },
];

export default function Dashboard() {
  const stats = useAdminStats();

  return (
    <Stack gap="lg">
      <Title order={2}>Bảng điều khiển</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={card.label} withBorder radius="md" padding="lg">
              <Group justify="space-between" align="flex-start">
                <Stack gap={0}>
                  <Text size="xs" c="dimmed" tt="uppercase" fw={500}>
                    {card.label}
                  </Text>
                  <Text fw={700} size="xl" lh={1}>
                    {stats[card.key]}
                  </Text>
                </Stack>
                <Icon size={28} stroke={1.5} color={`var(--mantine-color-${card.color}-6)`} />
              </Group>
            </Card>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
