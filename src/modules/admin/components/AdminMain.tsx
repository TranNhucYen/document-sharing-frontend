import { AppShell } from '@mantine/core';

interface Props {
  children: React.ReactNode;
}

export default function AdminMain({ children }: Props) {
  return <AppShell.Main>{children}</AppShell.Main>;
}
