'use client';

import { Text } from '@mantine/core';
import { useStatistics, type DocumentStat } from '../hooks/useAdmin';
import AdminTable, { type Column } from './AdminTable';

export default function AdminStatistics() {
  const stats = useStatistics();

  const columns: Column<DocumentStat>[] = [
    { key: 'id', label: 'Document ID', render: (doc) => doc.id },
    { key: 'title', label: 'Title', render: (doc) => <Text fw={500}>{doc.title}</Text> },
    { key: 'downloads', label: 'Downloads', render: (doc) => doc.downloads.toLocaleString() },
    { key: 'comments', label: 'Comments', render: (doc) => doc.comments },
    { key: 'views', label: 'Views', render: (doc) => doc.views.toLocaleString() },
  ];

  return (
    <AdminTable
      title="Thống kê tài liệu"
      columns={columns}
      rows={stats}
    />
  );
}
