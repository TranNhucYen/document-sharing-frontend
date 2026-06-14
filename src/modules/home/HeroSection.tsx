import { Autocomplete, Box, Button, Group, Stack, Text, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useSearchSuggestions } from '@/modules/docs/hooks/useDocs';
import classes from './HeroSection.module.css';

export default function HeroSection() {
  const searchSuggestions = useSearchSuggestions();
  return (
    <Box
      className={classes.heroWrapper}
      py={64}
      style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginTop: '-12px',
      }}
    >
      <Stack align="center" gap="lg">
        <Title order={1} ta="center" maw={560} fz={{ base: 28, sm: 34 }} lh={1.15}>
          Tìm kiếm và chia sẻ tài liệu trong tổ chức của bạn ngay lập tức
        </Title>

        <Text ta="center" className={classes.heroDescription} maw={560} fz="md">
          Kho tài liệu tập trung, an toàn cho tất cả tài liệu kỹ thuật, báo cáo chuyên đề và hướng dẫn vận hành của bạn.
        </Text>

        <Group
          className={classes.heroSearchGroup}
          p={6}
          pl="md"
          w="100%"
          maw={640}
          gap="sm"
          wrap="nowrap"
        >
          <Autocomplete
            variant="unstyled"
            flex={1}
            placeholder="Tìm kiếm theo tiêu đề, tác giả hoặc từ khóa..."
            leftSection={<IconSearch size={18} />}
            data={searchSuggestions}
          />

          <Button h={46} px="xl" radius="md">
            Tìm kiếm
          </Button>
        </Group>
      </Stack>
    </Box>
  );
}
