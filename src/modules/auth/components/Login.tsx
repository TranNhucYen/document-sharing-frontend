'use client';

import { Anchor, Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { IconLock, IconMail } from '@tabler/icons-react';
import Link from 'next/link';
import AuthShell from './AuthShell';

export default function Login() {
  return (
    <AuthShell
      leftTitle="Chào mừng trở lại"
      leftDescription="Đăng nhập để tiếp tục truy cập kho tài liệu và chia sẻ kiến thức với mọi người."
      formTitle="Đăng nhập"
      formDescription="Vui lòng đăng nhập để tiếp tục."
      bottomText={
        <>
          Chưa có tài khoản?{' '}
          <Anchor component={Link} href="/register" fw={600}>
            Đăng ký
          </Anchor>
        </>
      }
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack gap="md">
          <TextInput
            label="Email"
            placeholder="your@email.com"
            leftSection={<IconMail size={16} />}
            required
          />
          <PasswordInput
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            leftSection={<IconLock size={16} />}
            required
          />
          <Group justify="flex-end">
            <Anchor component={Link} href="#" size="xs">
              Quên mật khẩu?
            </Anchor>
          </Group>
          <Button fullWidth type="submit" size="md">
            Đăng nhập
          </Button>
        </Stack>
      </form>
    </AuthShell>
  );
}
