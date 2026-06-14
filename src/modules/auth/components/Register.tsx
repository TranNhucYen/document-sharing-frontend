'use client';

import { Anchor, Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { IconLock, IconMail, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import AuthShell from './AuthShell';

export default function Register() {
  return (
    <AuthShell
      leftTitle="Tham gia cùng chúng tôi"
      leftDescription="Tạo tài khoản để bắt đầu chia sẻ và khám phá tài liệu từ cộng đồng."
      formTitle="Tạo tài khoản"
      formDescription="Điền thông tin để bắt đầu."
      bottomText={
        <>
          Đã có tài khoản?{' '}
          <Anchor component={Link} href="/login" fw={600}>
            Đăng nhập
          </Anchor>
        </>
      }
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack gap="md">
          <TextInput
            label="Họ và tên"
            placeholder="Nguyễn Văn A"
            leftSection={<IconUser size={16} />}
            required
          />
          <TextInput
            label="Email"
            placeholder="your@email.com"
            leftSection={<IconMail size={16} />}
            required
          />
          <PasswordInput
            label="Mật khẩu"
            placeholder="Ít nhất 8 ký tự"
            leftSection={<IconLock size={16} />}
            required
          />
          <PasswordInput
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu"
            leftSection={<IconLock size={16} />}
            required
          />
          <Button fullWidth type="submit" size="md">
            Đăng ký
          </Button>
        </Stack>
      </form>
    </AuthShell>
  );
}
