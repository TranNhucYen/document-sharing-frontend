'use client';

import { useMemo, useState } from 'react';
import {
  ActionIcon, Badge, Box, Button, Group, Modal, Select, Stack, Text, TextInput, Title, Tooltip,
} from '@mantine/core';
import { openConfirmModal, openModal } from '@mantine/modals';
import {
  IconChevronRight, IconEdit, IconFolder, IconPlus, IconTrash,
} from '@tabler/icons-react';
import { useCategories, type CategoryNode } from '../hooks/useAdmin';
import classes from './AdminCategories.module.css';

type ModalState = { type: 'form'; node: CategoryNode | null } | null;

function openDeleteModal(node: CategoryNode) {
  if (node.children.length > 0) {
    openModal({
      title: 'Không thể xóa',
      children: (
        <Text size="sm" c="red">
          Không thể xóa <b>{node.name}</b> vì còn {node.children.length} danh mục con.
        </Text>
      ),
    });
  } else {
    openConfirmModal({
      title: 'Xóa danh mục',
      children: <Text size="sm">Bạn có chắc muốn xóa <b>{node.name}</b>? Hành động này không thể hoàn tác.</Text>,
      labels: { confirm: 'Xóa', cancel: 'Hủy' },
      confirmProps: { color: 'red' },
      onConfirm: () => {},
    });
  }
}

function flattenCategories(nodes: CategoryNode[], parentPath = ''): { label: string; value: string }[] {
  return nodes.flatMap((node) => {
    const label = parentPath ? `${parentPath} / ${node.name}` : node.name;
    return [{ label, value: node.id }, ...flattenCategories(node.children, label)];
  });
}

function TreeNode({node, level = 0, onEdit,}: {
  node: CategoryNode;
  level?: number;
  onEdit: (node: CategoryNode | null) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children.length > 0;

  return (
    <>
      <Group className={classes.row} gap={8} wrap="nowrap" style={{ paddingLeft: 8 + level * 22 }}>
        <ActionIcon
          variant="subtle"
          color="gray"
          size="sm"
          className={classes.chevron}
          onClick={() => setExpanded((v) => !v)}
          style={{ visibility: hasChildren ? 'visible' : 'hidden' }}
        >
          <IconChevronRight size={14} className={expanded ? classes.chevronOpen : ''} />
        </ActionIcon>

        <Box className={classes.iconWrap}>
          <IconFolder size={16} stroke={1.8} />
        </Box>

        <Text size="sm" fw={500} className={classes.label}>{node.name}</Text>

        {hasChildren && (
          <Badge size="xs" variant="light" color="gray" radius="sm">
            {node.children.length}
          </Badge>
        )}

        <Group gap={4} className={classes.actions}>
          <Tooltip label="Sửa" withArrow>
            <ActionIcon variant="subtle" color="gray" size="sm" onClick={() => onEdit(node)}>
              <IconEdit size={14} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Xóa" withArrow>
            <ActionIcon variant="subtle" color="red" size="sm" onClick={() => openDeleteModal(node)}>
              <IconTrash size={14} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      {hasChildren && expanded && node.children.map((child) => (
        <TreeNode key={child.id} node={child} level={level + 1} onEdit={onEdit} />
      ))}
    </>
  );
}

export default function AdminCategories() {
  const categories = useCategories();
  const [modal, setModal] = useState<ModalState>(null);

  const flatOptions = useMemo(() => flattenCategories(categories), [categories]);
  const editing = modal?.type === 'form' ? modal.node : null;

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Box>
          <Title order={2}>Danh mục</Title>
          <Text size="sm" c="dimmed">Quản lý cấu trúc danh mục sản phẩm</Text>
        </Box>
        <Button leftSection={<IconPlus size={16} />} onClick={() => setModal({ type: 'form', node: null })} radius="md">
          Thêm danh mục
        </Button>
      </Group>

      <Box className={classes.tree}>
        {categories.map((node) => (
          <TreeNode key={node.id} node={node} onEdit={(n) => setModal({ type: 'form', node: n })} />
        ))}
      </Box>

      <Modal
        opened={modal?.type === 'form'}
        onClose={() => setModal(null)}
        title={editing ? 'Sửa danh mục' : 'Thêm danh mục'}
        radius="md"
      >
        <Stack gap="sm">
          <TextInput label="Tên danh mục" placeholder="Ví dụ: Điện thoại" defaultValue={editing?.name ?? ''} />
          <TextInput label="Slug" placeholder="tu-dong-tao" defaultValue={editing?.slug ?? ''} />
          <Select
            label="Danh mục cha"
            placeholder="Không có (danh mục gốc)"
            data={flatOptions.filter((o) => o.value !== editing?.id)}
            clearable
          />
          <Group justify="flex-end" mt="sm">
            <Button variant="subtle" color="gray" onClick={() => setModal(null)}>Hủy</Button>
            <Button radius="md">Lưu</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}