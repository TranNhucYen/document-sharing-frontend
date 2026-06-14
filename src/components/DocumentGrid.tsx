'use client';

import Link from 'next/link';
import { Card, Image, SimpleGrid, Text, ScrollArea, Box, Group } from '@mantine/core';
import { IconStar, IconStarFilled } from '@tabler/icons-react';

export interface DocumentItem {
  id: string;
  image: string;
  name: string;
  author: string;
  publishedAt: string;
  rating: number;
}

interface DocumentGridProps {
  items: DocumentItem[];
  cols?: number;
  scroll?: boolean;
}

function DocumentCard({ item }: { item: DocumentItem }) {
  return (
    <Card
      component={Link}
      href={`/documents/${item.id}`}
      padding="lg"
      radius="md"
      withBorder
      style={{
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'inherit',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          window.location.href = `/documents/${item.id}`;
        }
      }}
    >
      <Card.Section>
        <Image src={item.image} height={200} alt={item.name} />
      </Card.Section>

      <Text fw={500} size="lg" mt="md" lineClamp={2}>
        {item.name}
      </Text>

      <Group gap={2} mt="xs">
        {Array.from({ length: 5 }, (_, i) =>
          i < item.rating ? (
            <IconStarFilled key={i} size={14} color="var(--mantine-color-orange-filled)" />
          ) : (
            <IconStar key={i} size={14} color="var(--mantine-color-gray-5)" />
          )
        )}
      </Group>

      <Box mt="auto">
        <Text size="sm" c="dimmed" mt="xs">
          {item.author}
        </Text>
        <Text size="sm" c="dimmed">
          {item.publishedAt}
        </Text>
      </Box>
    </Card>
  );
}

export default function DocumentGrid({ items, cols = 3, scroll = true }: DocumentGridProps) {
  return (
    <ScrollArea h={scroll ? 600 : undefined} type="scroll">
      <SimpleGrid cols={{ base: 1, sm: 2, lg: cols }} spacing="lg">
        {items.map((item) => (
          <DocumentCard key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </ScrollArea>
  );
}
