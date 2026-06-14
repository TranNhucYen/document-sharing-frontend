'use client';

import type { ReactNode } from 'react';
import {
  Group, Pagination, SegmentedControl, Stack, Table, TextInput, Title,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export interface Column<T> {
  key: string;
  label: string;
  render: (item: T, index: number) => ReactNode;
}

interface AdminTableProps<T> {
  title?: string;
  headerActions?: ReactNode;
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  columns: Column<T>[];
  rows: T[];
  totalPages?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  withPagination?: boolean;
}

export default function AdminTable<T>({
  title,
  headerActions,
  tabs,
  activeTab,
  onTabChange,
  search,
  onSearchChange,
  searchPlaceholder = 'Tìm kiếm...',
  columns,
  rows,
  totalPages = 1,
  page = 1,
  onPageChange,
  withPagination = false,
}: AdminTableProps<T>) {
  return (
    <Stack gap="lg">
      {title && (
        <Group justify="space-between">
          <Title order={2}>{title}</Title>
          {headerActions}
        </Group>
      )}

      {(tabs || onSearchChange) && (
        <Group justify="space-between">
          {tabs && activeTab && onTabChange && (
            <SegmentedControl value={activeTab} onChange={onTabChange} data={tabs} />
          )}
          {onSearchChange && (
            <TextInput
              placeholder={searchPlaceholder}
              leftSection={<IconSearch size={16} />}
              value={search || ''}
              onChange={(e) => onSearchChange(e.currentTarget.value)}
              style={{ maxWidth: 320 }}
            />
          )}
        </Group>
      )}

      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            {columns.map((col) => (
              <Table.Th key={col.key}>{col.label}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.map((item, index) => (
            <Table.Tr key={index}>
              {columns.map((col) => (
                <Table.Td key={col.key}>{col.render(item, index)}</Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {withPagination && onPageChange && totalPages > 1 && (
        <Group justify="center">
          <Pagination total={totalPages} value={page} onChange={onPageChange} />
        </Group>
      )}
    </Stack>
  );
}
