'use client';

import {
  Badge, Button, Group, Modal, Select, Stack, Switch, Text, TextInput,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { useAdminUsers, type AdminUser } from '../hooks/useAdmin';
import AdminTable, { type Column } from './AdminTable';

function openDeleteModal(user: AdminUser) {
  openConfirmModal({
    title: 'Xóa người dùng',
    children: <Text size="sm">Bạn có chắc muốn xóa "{user.email}"?</Text>,
    labels: { confirm: 'Delete', cancel: 'Cancel' },
    confirmProps: { color: 'red' },
    onConfirm: () => {},
  });
}

export default function AdminUsers() {
  const users = useAdminUsers();
  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);

  const columns: Column<AdminUser>[] = [
    { key: '#', label: '#', render: (_user, index) => index + 1 },
    { key: 'email', label: 'Email', render: (user) => user.email },
    { key: 'fullName', label: 'Full Name', render: (user) => user.fullName },
    {
      key: 'roles', label: 'Roles', render: (user) => (
        <Group gap="xs">{user.roles.map((role) => <Badge key={role} variant="light" size="sm">{role}</Badge>)}</Group>
      ),
    },
    { key: 'active', label: 'Active', render: (user) => <Switch defaultChecked={user.active} size="sm" /> },
    { key: 'createdAt', label: 'Created At', render: (user) => user.createdAt },
    {
      key: 'actions', label: 'Actions', render: (user) => (
        <Group gap="xs" wrap="nowrap">
          <Button size="xs" variant="outline" leftSection={<IconEdit size={14} />}>Edit</Button>
          <Button size="xs" color="red" variant="outline" leftSection={<IconTrash size={14} />} onClick={() => openDeleteModal(user)}>Delete</Button>
        </Group>
      ),
    },
  ];

  return (
    <>
      <AdminTable
        title="Quản lý người dùng"
        columns={columns}
        rows={users}
        headerActions={
          <Button leftSection={<IconPlus size={16} />} onClick={openAdd}>Add User</Button>
        }
      />

      <Modal opened={addOpened} onClose={closeAdd} title="Thêm người dùng">
        <Stack gap="sm">
          <TextInput label="Email" placeholder="user@example.com" />
          <TextInput label="Full Name" placeholder="Nguyễn Văn A" />
          <TextInput label="Password" placeholder="••••••••" type="password" />
          <Select label="Role" placeholder="Chọn vai trò" data={['Admin', 'Moderator', 'User']} defaultValue="User" />
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={closeAdd}>Cancel</Button>
            <Button>Create</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
