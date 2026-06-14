'use client';

import { useState } from 'react';
import {
  Badge, Button, Checkbox, Group, Modal, Stack, Text, TextInput, Textarea,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { useRoles, type AdminRoleItem } from '../hooks/useAdmin';
import AdminTable, { type Column } from './AdminTable';

function openDeleteModal(role: AdminRoleItem) {
  openConfirmModal({
    title: 'Xóa vai trò',
    children: <Text size="sm">Bạn có chắc muốn xóa vai trò "{role.name}"?</Text>,
    labels: { confirm: 'Delete', cancel: 'Cancel' },
    confirmProps: { color: 'red' },
    onConfirm: () => {},
  });
}

export default function AdminRoles() {
  const roles = useRoles();
  const [editRole, setEditRole] = useState<AdminRoleItem | null>(null);
  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);

  const columns: Column<AdminRoleItem>[] = [
    { key: '#', label: '#', render: (_role, index) => index + 1 },
    { key: 'name', label: 'Name', render: (role) => <Badge variant="light">{role.name}</Badge> },
    { key: 'description', label: 'Description', render: (role) => role.description },
    { key: 'usersCount', label: 'Users Count', render: (role) => role.usersCount },
    {
      key: 'actions', label: 'Actions', render: (role) => (
        <Group gap="xs" wrap="nowrap">
          <Button size="xs" variant="outline" leftSection={<IconEdit size={14} />} onClick={() => setEditRole(role)}>Edit</Button>
          <Button size="xs" color="red" variant="outline" leftSection={<IconTrash size={14} />} onClick={() => openDeleteModal(role)}>Delete</Button>
        </Group>
      ),
    },
  ];

  return (
    <>
      <AdminTable
        title="Quản lý vai trò"
        columns={columns}
        rows={roles}
        headerActions={
          <Button leftSection={<IconPlus size={16} />} onClick={openAdd}>+ Add Role</Button>
        }
    />

      <Modal key={editRole?.id ?? 'add'} opened={!!editRole || addOpened} onClose={() => { setEditRole(null); closeAdd(); }} title={editRole ? 'Sửa vai trò' : 'Thêm vai trò'} size="lg">
        <Stack gap="sm">
          <TextInput label="Tên" placeholder="Tên vai trò" defaultValue={editRole?.name || ''} />
          <Textarea label="Mô tả" placeholder="Mô tả vai trò" defaultValue={editRole?.description || ''} />

          <Stack gap="xs" mt="sm">
            {(editRole?.permissions || []).map((perm) => (
              <Checkbox key={perm.id} label={perm.name} defaultChecked={perm.enabled} />
            ))}
          </Stack>

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => { setEditRole(null); closeAdd(); }}>Cancel</Button>
            <Button>Save</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
