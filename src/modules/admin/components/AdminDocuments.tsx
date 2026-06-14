'use client';

import { useState } from 'react';
import {
  Badge, Button, Group, Modal, Text, Textarea,
} from '@mantine/core';
import { closeAllModals, openConfirmModal, openModal } from '@mantine/modals';
import { useAdminDocuments, type AdminDocument, type DocumentStatus } from '../hooks/useAdmin';
import AdminTable, { type Column } from './AdminTable';

const statusColors: Record<DocumentStatus, string> = {
  Pending: 'yellow',
  Approved: 'green',
  Rejected: 'red',
  Hidden: 'gray',
};

const statusLabels: Record<DocumentStatus, string> = {
  Pending: 'Chờ duyệt',
  Approved: 'Đã duyệt',
  Rejected: 'Từ chối',
  Hidden: 'Ẩn',
};

const tabs = ['Tất cả', 'Chờ duyệt', 'Đã duyệt', 'Từ chối', 'Ẩn'];
const filterStatusMap: (DocumentStatus | null)[] = [null, 'Pending', 'Approved', 'Rejected', 'Hidden'];

function openApproveModal(doc: AdminDocument) {
  openConfirmModal({
    title: 'Xác nhận duyệt tài liệu',
    children: <Text size="sm">Bạn có chắc muốn duyệt tài liệu "{doc.title}"?</Text>,
    labels: { confirm: 'Duyệt', cancel: 'Hủy' },
    confirmProps: { color: 'green' },
    onConfirm: () => {},
  });
}

function openReasonModal(doc: AdminDocument) {
  openModal({
    title: 'Lý do từ chối',
    children: (
      <>
        <Text size="sm">{doc.rejectionReason || 'Không có lý do'}</Text>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={() => closeAllModals()}>Đóng</Button>
        </Group>
      </>
    ),
  });
}

export default function AdminDocuments() {
  const allDocs = useAdminDocuments();
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const [rejectModal, setRejectModal] = useState<AdminDocument | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const filterStatus = filterStatusMap[tabs.indexOf(activeTab)];
  const filtered = allDocs.filter((doc) => {
    if (filterStatus && doc.status !== filterStatus) { return false; }
    if (search && !doc.title.toLowerCase().includes(search.toLowerCase())) { return false; }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns: Column<AdminDocument>[] = [
    { key: '#', label: '#', render: (_doc, index) => (page - 1) * pageSize + index + 1 },
    { key: 'title', label: 'Title', render: (doc) => <Text fw={500}>{doc.title}</Text> },
    { key: 'category', label: 'Category', render: (doc) => doc.category },
    { key: 'uploadedBy', label: 'Uploaded By', render: (doc) => doc.uploadedBy },
    {
      key: 'status', label: 'Status', render: (doc) => (
        <Badge color={statusColors[doc.status]} variant="light">{statusLabels[doc.status]}</Badge>
      ),
    },
    { key: 'createdAt', label: 'Created At', render: (doc) => doc.createdAt },
    {
      key: 'actions', label: 'Actions', render: (doc) => (
        <Group gap="xs" wrap="nowrap">
          {doc.status === 'Pending' && (
            <>
              <Button size="xs" color="green" onClick={() => openApproveModal(doc)}>Approve</Button>
              <Button size="xs" color="red" onClick={() => setRejectModal(doc)}>Reject</Button>
            </>
          )}
          {doc.status === 'Approved' && <Button size="xs" variant="outline" color="gray">Hide</Button>}
          {doc.status === 'Rejected' && <Button size="xs" variant="subtle" onClick={() => openReasonModal(doc)}>View Reason</Button>}
          {doc.status === 'Hidden' && <Button size="xs" variant="outline" color="green">Unhide</Button>}
        </Group>
      ),
    },
  ];

  return (
    <>
      <AdminTable
        title="Quản lý tài liệu"
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tab) => { setActiveTab(tab); setPage(1); }}
        search={search}
        onSearchChange={(val) => { setSearch(val); setPage(1); }}
        columns={columns}
        rows={paged}
        totalPages={totalPages}
        page={page}
        onPageChange={setPage}
        withPagination
      />

      <Modal opened={!!rejectModal} onClose={() => { setRejectModal(null); setRejectReason(''); }} title="Từ chối tài liệu">
        <Textarea
          label="Lý do từ chối"
          placeholder="Nhập lý do từ chối..."
          required
          value={rejectReason}
          onChange={(e) => setRejectReason(e.currentTarget.value)}
          mb="md"
          autosize
          minRows={3}
        />
        <Group justify="flex-end">
          <Button variant="default" onClick={() => { setRejectModal(null); setRejectReason(''); }}>Hủy</Button>
          <Button color="red" disabled={!rejectReason.trim()}>Từ chối</Button>
        </Group>
      </Modal>
    </>
  );
}
