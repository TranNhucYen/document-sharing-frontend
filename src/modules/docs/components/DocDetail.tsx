'use client';
import '@mantine/carousel/styles.css';
import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Group,
  Image,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDownload,
  IconEye,
  IconFlag,
  IconMaximize,
  IconShare,
  IconStar,
  IconStarFilled,
  IconUserCircle,
} from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import { useDocImages } from '../hooks/useDocs';
import classes from './DocDetail.module.css';

export default function DocDetail() {
  const id = useParams().id;
  const images = useDocImages();
  const [previewOpened, { open: openPreview, close: closePreview }] = useDisclosure(false);
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
      <Stack gap="xl">
        <Stack gap="md">
          <Title order={2}>Tài liệu số {id}</Title>

          <Group>
            <Button leftSection={<IconEye size={16} />}>Đọc online</Button>

            <Button variant="default" leftSection={<IconDownload size={16} />}>
              Tải PDF
            </Button>
          </Group>
        </Stack>

        {/* Image Carousel */}
        <Paper withBorder radius="md" p="xl" className={classes.carouselContainer}>
          <Box pos="relative">
            <Carousel slideSize="100%" withControls withIndicators emblaOptions={{ loop: true }}>
              {images.map((src, index) => (
                <Carousel.Slide key={index}>
                  <Paper shadow="md" radius="md" className={classes.carouselSlidePaper} mx="auto" maw={420} h={520} p="xl">
                    <Image src={src} alt={`Xem trước tài liệu ${index + 1}`} />
                  </Paper>
                </Carousel.Slide>
              ))}
            </Carousel>

            <Paper shadow="sm" radius="xl" p={4} pos="absolute" bottom={12} right={12}>
              <ActionIcon variant="subtle" onClick={openPreview}>
                <IconMaximize size={18} />
              </ActionIcon>
            </Paper>
          </Box>
        </Paper>
      </Stack>

      <Stack gap="md">
        <Card withBorder radius="md" p="lg">
          <Stack gap="md">
            <Text size="xs" fw={700} tt="uppercase">
              Mô tả
            </Text>

            <Text size="sm" c="dimmed">
              Tài liệu này trình bày chi tiết kiến trúc tổng quan và các yêu cầu kỹ thuật cho Dự án
              Horizon. Bao gồm sơ đồ hạ tầng, giao thức bảo mật, chiến lược di chuyển dữ liệu và đặc
              tả thành phần giao diện người dùng.
            </Text>

            <Group justify="space-between">
              <Stack gap={0}>
                <Text size="xs" c="dimmed">
                  Lượt xem
                </Text>
                <Text fw={700}>1,284</Text>
              </Stack>

              <Stack gap={0} align="flex-end">
                <Text size="xs" c="dimmed">
                  Đánh giá
                </Text>
                <Group gap={4}>
                  <Text fw={700}>4.8</Text>
                  <IconStarFilled size={14} color="orange" />
                  <IconStarFilled size={14} color="orange" />
                  <IconStarFilled size={14} color="orange" />
                  <IconStarFilled size={14} color="orange" />
                  <IconStar size={14} color="orange" />
                </Group>
              </Stack>
            </Group>
          </Stack>
        </Card>

        <Card withBorder radius="md" p="lg">
          <Stack gap="sm">
            <Text size="xs" fw={700} tt="uppercase">
              Chi tiết tài liệu
            </Text>

            <Group justify="space-between">
              <Text size="xs">Người đăng</Text>
              <Group gap={6}>
                <IconUserCircle size={16} />
                <Text size="xs" fw={600}>
                  Nguyễn Văn A
                </Text>
              </Group>
            </Group>

            <Group justify="space-between">
              <Text size="xs">Cập nhật</Text>
              <Text size="xs" fw={600}>
                Oct 24, 2024
              </Text>
            </Group>

            <Group justify="space-between">
              <Text size="xs">Kích thước</Text>
              <Text size="xs" fw={600}>
                12.4 MB
              </Text>
            </Group>

            <Group justify="space-between">
              <Text size="xs">Tệp - Trang</Text>
              <Text size="xs" fw={600}>
                3 File - 300 Trang
              </Text>
            </Group>
          </Stack>
        </Card>

        <Card withBorder radius="md" p="lg">
          <Stack gap="md">
            <Text size="xs" fw={700} tt="uppercase">
              Đánh giá tài liệu
            </Text>

            <Paper withBorder radius="md" p="md" className={classes.ratingPaper}>
              <Group justify="space-between">
                <Group gap={6}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <IconStar key={index} size={18} className={classes.interactiveStar} />
                  ))}
                </Group>

                <Text size="xs" c="dimmed">
                  Chạm để đánh giá
                </Text>
              </Group>
            </Paper>
          </Stack>
        </Card>

        <Button variant="default" leftSection={<IconShare size={16} />}>
          Chia sẻ tài liệu
        </Button>

        <Button variant="default" leftSection={<IconFlag size={16} />}>
          Báo cáo
        </Button>
      </Stack>

      <Modal
        opened={previewOpened}
        onClose={closePreview}
        title="Xem trước"
        size="xl"
        centered
      />
    </SimpleGrid>
  );
}
