import { AppShell, NavLink } from '@mantine/core';
import {
  IconCategory, IconChartBar, IconDashboard, IconFolder,
  IconHistory, IconShield, IconUsers,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRoleNavItems } from '../hooks/useAdmin';

const iconMap: Record<string, React.ElementType> = {
  IconDashboard,
  IconFolder,
  IconCategory,
  IconUsers,
  IconShield,
  IconHistory,
  IconChartBar,
};

export default function AdminNavbar({ path }: { path: string }) {
  const navItems = useRoleNavItems();
  return (
    <AppShell.Navbar p="md">
      {navItems.map((item) => {
        const active = path === item.href;
        const Icon = iconMap[item.icon];
        return (
          <NavLink
            key={item.href}
            label={item.label}
            component={Link}
            href={item.href}
            leftSection={
              <Icon
                size={18}
                stroke={1.5}
                style={{
                  color: active
                    ? 'var(--mantine-primary-color-filled)'
                    : 'var(--mantine-color-dimmed)',
                  transition: 'color 0.2s ease',
                }}
              />
            }
            active={active}
            variant="light"
            style={{
              borderRadius: 8,
              fontWeight: active ? 600 : 500,
              marginBottom: 4,
              borderLeft: active
                ? '3px solid var(--mantine-primary-color-filled)'
                : '3px solid transparent',
              transition: 'all 0.15s ease',
            }}
          />
        );
      })}
    </AppShell.Navbar>
  );
}
