import { Stack } from '@mantine/core';
import { Profile } from '@/modules/account/components';

export default function AccountPage() {
  return (
    <Stack gap={24}>
      <Profile />
    </Stack>
  );
}
