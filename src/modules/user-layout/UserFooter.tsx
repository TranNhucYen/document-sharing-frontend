import { Anchor, Box, Container, Group, Text } from '@mantine/core';
import Link from 'next/link';

export default function UserFooter() {
  return (
    <Box
      component="footer"
      py="xl"
      style={{
        background: 'var(--mantine-color-brand-9)',
        borderTop: '3px solid var(--mantine-color-brand-6)',
      }}
    >
      <Container size="xl">
        <Group justify="space-between" align="center" wrap="wrap" gap="sm">
          <Text size="sm" c="gray.4">
            &copy; {new Date().getFullYear()} DocShare. Tất cả quyền được bảo lưu.
          </Text>
          <Group gap="md" wrap="nowrap">
            <Anchor component={Link} href="/" size="sm" c="gray.4">
              Chính sách bảo mật
            </Anchor>
            <Anchor component={Link} href="/" size="sm" c="gray.4">
              Điều khoản dịch vụ
            </Anchor>
            <Anchor component={Link} href="/" size="sm" c="gray.4">
              Liên hệ
            </Anchor>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
