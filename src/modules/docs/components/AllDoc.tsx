'use client';
import {
  ActionIcon, type ActionIconProps, Button, Checkbox, Grid, Group, Paper, RangeSlider,
  SegmentedControl, Select, Stack, Text, TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconSearch, IconLayoutSidebarLeftExpand, IconLayoutSidebarLeftCollapse,
} from '@tabler/icons-react';
import { useState } from 'react';
import DocumentGrid from '@/components/DocumentGrid';
import { useSampleDocuments, useCategoryOptions } from '../hooks/useDocs';

function SidebarToggle({
  onClick,
  expanded,
}: { onClick: () => void; expanded?: boolean } & ActionIconProps) {
  return (
    <ActionIcon
      variant="subtle"
      color="gray"
      size="md"
      radius="md"
      onClick={onClick}
      {...(expanded
        ? ({ pos: 'absolute', top: 'var(--mantine-spacing-md)', right: 12 } as const)
        : {})}
      style={{
        transition: 'all 0.2s ease',
      }}
    >
      {expanded ? <IconLayoutSidebarLeftCollapse size={20} /> : <IconLayoutSidebarLeftExpand size={20} />}
    </ActionIcon>
  );
}

export default function AllDoc() {
  const sampleDocuments = useSampleDocuments();
  const categoryOptions = useCategoryOptions();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [sidebarOpen, { open: openSidebar, close: closeSidebar }] = useDisclosure(true);

  const currentOptions = selectedCategory ? categoryOptions[selectedCategory] : [];

  return (
    <Grid gap="md" pos="relative">
      {/* Filter sidebar */}
      {sidebarOpen && (
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Paper p="md" withBorder pos="relative">
            <SidebarToggle expanded onClick={closeSidebar} />
            <Stack gap="md">
              <Text fw={600} size="lg">
                Bộ lọc
              </Text>

              <TextInput
                placeholder="Tìm kiếm tài liệu..."
                leftSection={<IconSearch size={16} />}
              />
              {/* thể loại */}
              <Select
                label="Thể loại"
                placeholder="Chọn danh mục"
                data={Object.keys(categoryOptions)}
                value={selectedCategory}
                onChange={setSelectedCategory}
                clearable
              />
              {currentOptions.length > 0 && (
                <Checkbox.Group label="Chi tiết" value={checkedItems} onChange={setCheckedItems}>
                  <Stack gap="xs" mt="xs">
                    {currentOptions.map((option) => (
                      <Checkbox key={option} value={option} label={option} />
                    ))}
                  </Stack>
                </Checkbox.Group>
              )}
              {/* Ngày đăng */}
              <Stack gap={4}>
                <Text size="sm" fw={500}>
                  Ngày đăng
                </Text>
                <RangeSlider min={0} max={100} defaultValue={[0, 100]} />
              </Stack>

              <Button variant="subtle" color="gray" fullWidth>
                Đặt lại
              </Button>
            </Stack>
          </Paper>
        </Grid.Col>
      )}

      {/* main content */}
      <Grid.Col span={{ base: 12, md: sidebarOpen ? 9 : 12 }}>
        <Paper p="md" pos="relative">
          <Stack gap="md">
            <Group justify="space-between" align="center">
              <Group>
                {!sidebarOpen && <SidebarToggle onClick={openSidebar} />}
                <Text fw={600} size="lg">
                  Tất cả tài liệu
                </Text>
              </Group>
              <SegmentedControl
                radius="xl"
                data={['Mới nhất', 'Nhiều lượt xem', 'Nhiều lượt tải', 'Đánh giá cao']}
              />
            </Group>
            <DocumentGrid items={sampleDocuments} cols={sidebarOpen ? 3 : 4} />
            <Group justify="center">{/* Pagination will be rendered here */}</Group>
          </Stack>
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
