'use client';

import { Box, Container, Flex } from '@mantine/core';
import Footer from './UserFooter';
import Header from './UserHeader';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" mih="100vh">
      <Header />
      <Box style={{ flex: 1 }}>
        <Container size="xl" py="sm">
          {children}
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
}
