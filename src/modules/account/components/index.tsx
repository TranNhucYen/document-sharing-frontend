'use client';
import { Grid, ScrollArea } from '@mantine/core';
import Sidebar from './Sidebar';

export function AccountShell({ children }: { children: React.ReactNode }) {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <Sidebar />
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 9 }}>
        <ScrollArea h="calc(100vh - 140px)" scrollbarSize={0}>
          {children}
        </ScrollArea>
      </Grid.Col>
    </Grid>
  );
}

export { default as Profile } from './Profile';
export { default as Security } from './Security';
export { default as Notification } from './Notification';
