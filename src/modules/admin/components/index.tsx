'use client';
import { AppShell } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import AdminHeader from './AdminHeader';
import AdminMain from './AdminMain';
import AdminNavbar from './AdminNavbar';
const searchData = ['Bảng điều khiển', 'Người dùng', 'Tài liệu'];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const path = usePathname();

  return (
    <ModalsProvider>
      <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{
          width: 250,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
      >
        <AdminHeader opened={opened} toggle={toggle} searchData={searchData} />
        <AdminNavbar path={path} />
        <AdminMain>{children}</AdminMain>
      </AppShell>
    </ModalsProvider>
  );
}
