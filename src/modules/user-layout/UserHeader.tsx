'use client';

import {
  ActionIcon,
  Anchor,
  Autocomplete,
  Avatar,
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Indicator,
  Menu,
  Modal,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBell, IconLogout, IconSearch, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ColorSchemeToggle from '@/components/ColorSchemeToggle';
import Logo from '@/components/Logo';
import classes from './UserHeader.module.css';
import { useState } from 'react';

export default function UserHeader() {
  const navItems: { label: string; href: string }[] = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tất cả tài liệu', href: '/documents' },
    { label: 'Upload', href: '/upload-documents' },
    { label: 'Tài khoản', href: '/account' },
  ];
  const [opened, setOpened] = useState(false);
  const [logoutOpened, { open: openLogout, close: closeLogout }] = useDisclosure(false);
  const pathname = usePathname();

  const items = navItems.map((item) => ({
    ...item,
    active: item.href === '/' ? pathname === '/' : pathname.startsWith(item.href),
  }));

  return (
    <Box
      component="header"
      className={classes.headerContainer}
    >
      <Container size="xl" py="sm">
        <Group justify="space-between" align="center" wrap="wrap" gap="sm">
          <Group>
            {/* logo */}
            <Logo w={100} />
            {/* nav item  */}
            <Group gap="xs" wrap="nowrap" visibleFrom="sm">
              {items.map((item) => (
                <Anchor
                  key={item.href}
                  component={Link}
                  href={item.href}
                  className={`${classes.navLink} ${item.active ? classes.active : ''}`}
                  underline="never"
                >
                  {item.label}
                </Anchor>
              ))}
            </Group>
          </Group>
          {/* notification and user menu */}
          <Group gap="md" align="center">
            <Autocomplete
              w={300}
              placeholder="Tìm kiếm..."
              leftSection={<IconSearch size={18} />}
              data={['Tài liệu kiến trúc', 'Hướng dẫn API', 'Sổ tay bảo mật', 'Báo cáo tài chính']}
            />

            <ColorSchemeToggle />

            {/* notification */}
            <Indicator inline size={10} offset={4} color="red" withBorder>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="lg"
                radius="xl"
                component={Link}
                href="/account/notifications"
              >
                <IconBell size={20} />
              </ActionIcon>
            </Indicator>
            {/* user menu */}
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray" size="lg" radius="xl">
                  <Avatar src={null} alt="avatar" color="brand" radius="xl" size="md">
                    Yen
                  </Avatar>
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconUser size={16} />} component={Link} href="/account">
                  Tài khoản
                </Menu.Item>

                <Menu.Divider />
                <Menu.Item leftSection={<IconLogout size={16} />} color="red" onClick={openLogout}>
                  Đăng xuất
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>

          <Burger
            opened={opened}
            onClick={() => setOpened((current) => !current)}
            hiddenFrom="sm"
            size="sm"
            aria-label="Mở sidebar điều hướng"
          />
        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Điều hướng"
        position="left"
        size="xs"
      >
        <Stack gap="xs">
          {items.map((item) => (
            <Anchor
              key={item.href}
              component={Link}
              href={item.href}
              fw={item.active ? 700 : 600}
              onClick={() => setOpened(false)}
              underline="never"
              style={{
                display: 'block',
                padding: '8px 12px',
                borderRadius: '6px',
                color: item.active ? 'var(--mantine-color-brand-6)' : 'var(--mantine-color-text)',
                backgroundColor: item.active ? 'var(--mantine-color-brand-0)' : 'transparent',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </Anchor>
          ))}
        </Stack>
      </Drawer>

      <Modal opened={logoutOpened} onClose={closeLogout} title="Xác nhận đăng xuất" centered>
        <Text mb="lg">Bạn có chắc muốn đăng xuất không?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={closeLogout}>
            Hủy
          </Button>
          <Button color="red" component={Link} href="/login" onClick={closeLogout}>Đăng xuất</Button>
        </Group>
      </Modal>
    </Box>
  );
}
