import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Burger,
  Group,
  Indicator,
  Menu,
  Stack,
  Text,
  Autocomplete,
} from '@mantine/core';
import {
  IconBell,
  IconChevronRight,
  IconLogout,
  IconSearch,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import ColorSchemeToggle from '@/components/ColorSchemeToggle';
import Logo from '@/components/Logo';
import classes from './AdminHeader.module.css';

interface Props {
  opened: boolean;
  searchData: string[];
  toggle: () => void;
}

export default function AdminHeader({ opened, searchData, toggle }: Props) {
  return (
    <AppShell.Header
      px="md"
      className={classes.headerContainer}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <Group gap="sm" wrap="nowrap">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Logo w={100} />
      </Group>

      <Group gap="xl" wrap="nowrap" justify="flex-end" style={{ flex: 1 }}>
        <Box style={{ flex: 1, maxWidth: 420 }} visibleFrom="sm">
          <Autocomplete
            leftSection={<IconSearch size={16} />}
            placeholder="Tìm kiếm biểu mẫu, tài liệu..."
            size="sm"
            data={searchData}
          />
        </Box>

        <ColorSchemeToggle />

        <Indicator label="3" size={16} color="red" offset={4}>
          <ActionIcon variant="subtle" color="gray" size="lg" aria-label="Thông báo">
            <IconBell size={20} />
          </ActionIcon>
        </Indicator>

        <Menu shadow="md" width={180} position="bottom-end">
          <Menu.Target>
            <Group style={{ cursor: 'pointer' }}>
              <Avatar size={34} radius="xl" color="brand">
                <IconUser size={18} />
              </Avatar>
              <Stack gap={0}>
                <Text size="xs" c="dimmed" lh={1.2}>
                  Xin chào,
                </Text>
                <Text size="sm" fw={600} lh={1.4}>
                  Nguyễn Văn A
                </Text>
              </Stack>
              <ActionIcon variant="subtle" color="gray" size="lg">
                <IconChevronRight />
              </ActionIcon>
            </Group>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Tài khoản</Menu.Label>
            <Menu.Item leftSection={<IconSettings size={14} />}>Cài đặt</Menu.Item>
            <Menu.Divider />
            <Menu.Item leftSection={<IconLogout size={14} />} color="red">
              Đăng xuất
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </AppShell.Header>
  );
}
