'use client';

import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconCamera, IconId } from '@tabler/icons-react';
import { useUserProfile } from '../hooks/useAccount';

export default function Profile() {
  const profile = useUserProfile();
  return (
    <>
      <Paper withBorder radius="md" p={32}>
        <Group>
          <Box pos="relative">
            <Avatar size={110} radius="50%" src="" />
            <ActionIcon radius="xl" size="lg" pos="absolute" right={0} bottom={0}>
              <IconCamera size={18} />
            </ActionIcon>
          </Box>

          <Box>
            <Title order={1}>{profile.name}</Title>
            <Text size="lg" c="dimmed">
              {profile.role}
            </Text>
            <Button mt="md">Cập nhật ảnh đại diện</Button>
          </Box>
        </Group>
      </Paper>
      <Paper withBorder radius="md" p={32}>
        <Stack>
          <Group>
            <IconId size={22} color="var(--mantine-primary-color-filled)" />
            <Title order={3}>Thông tin cá nhân</Title>
          </Group>

          <Grid>
            <Grid.Col span={6}>
              <TextInput label="Họ và tên" defaultValue={profile.name} />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput label="Địa chỉ Email" defaultValue={profile.email} />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end">
            <Button>Lưu thay đổi</Button>
          </Group>
        </Stack>
      </Paper>
    </>
  );
}
