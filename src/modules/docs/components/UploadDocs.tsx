'use client';

import {
  ActionIcon,
  Alert,
  Anchor,
  Button,
  Grid,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Title,
  Box,
  Stepper,
} from '@mantine/core';
import {
  IconCloudUpload,
  IconFileUpload,
  IconInfoCircle,
  IconSend,
  IconFileText,
  IconTrash,
  IconFile,
} from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { useCategoryOptions } from '../hooks/useDocs';

export default function UploadDocs() {
  const categoryOptions = useCategoryOptions();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [theloaicha, setTheloaicha] = useState<string | null>(null);
  const [active, setActive] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Xử lý khi người dùng chọn file từ input hoặc kéo thả
  const handleFileSelect = (fileList: FileList | null) => {
    if (!fileList) return;
    setFiles((prev) => [...prev, ...Array.from(fileList)]);
  };

  // Xoá file khỏi danh sách đã chọn
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Định dạng dung lượng file (B, KB, MB)
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <Stack gap="lg">
      {/* Header: tiêu đề trang */}
      <Box>
        <Title order={2}>Tải lên tài liệu</Title>
        <Text size="sm" c="dimmed">
          Đóng góp vào kho kiến thức chung bằng cách chia sẻ chuyên môn của bạn.
        </Text>
      </Box>

      <Grid gap="lg">
        {/* Cột trái (4): thông tin chi tiết tài liệu */}
        <Grid.Col span={{ base: 12, md: 4 }} style={{ display: 'flex' }}>
          <Paper p="lg" radius="md" withBorder style={{ flex: 1 }}>
            <Stack gap="md" h="100%">
              <Group gap="xs">
                <IconFileText size={18} color="var(--mantine-primary-color-filled)" />
                <Text fw={700}>Chi tiết tài liệu</Text>
              </Group>

              {/* Tiêu đề tài liệu */}
              <TextInput label="Tiêu đề" placeholder="Nhập tiêu đề mô tả cho tài liệu" />

              {/* Danh mục chính */}
              <Select
                label="Danh mục"
                placeholder="Chọn một danh mục"
                data={Object.keys(categoryOptions)}
                value={selectedCategory}
                onChange={(val) => {
                  setSelectedCategory(val);
                  setTheloaicha(null);
                }}
                clearable
              />

              {/* Thể loại con (hiện khi đã chọn danh mục) */}
              {selectedCategory && (
                <Select
                  label={`${selectedCategory} > ${theloaicha ?? ''}`}
                  placeholder="Chọn thể loại con"
                  data={categoryOptions[selectedCategory]}
                  value={theloaicha}
                  onChange={setTheloaicha}
                  clearable
                />
              )}

              {/* Mô tả tài liệu */}
              <Textarea
                label="Mô tả"
                placeholder="Cung cấp tóm tắt ngắn gọn về nội dung tài liệu..."
                rows={8}
              />
            </Stack>
          </Paper>
        </Grid.Col>

        {/* Cột phải (8): stepper hướng dẫn + chọn file */}
        <Grid.Col span={{ base: 12, md: 8 }} style={{ display: 'flex' }}>
          <Stack gap="md" style={{ flex: 1 }}>
            {/* Stepper quy trình tải lên */}
            <Stepper active={active} onStepClick={setActive}>
              <Stepper.Step label="Tải lên" description="Tải lên file của bạn">
                Bước 1: Điền thông tin tài liệu và tải lên file của bạn. Hỗ trợ PDF, DOCX, PPTX.
              </Stepper.Step>
              <Stepper.Step label="Chờ duyệt" description="Đang chờ xét duyệt">
                Bước 2: Tài liệu của bạn đang được xem xét bởi nhóm quản trị. Quá trình này thường
                mất khoảng 24 giờ.
              </Stepper.Step>
              <Stepper.Step label="Đã duyệt/Từ chối" description="Được duyệt hoặc ...">
                Bước 3: Tài liệu của bạn đã được xét duyệt hoặc từ chối.
              </Stepper.Step>
              <Stepper.Completed>Hoàn tất, nhấn nút quay lại để về bước trước</Stepper.Completed>
            </Stepper>

            {/* Khu vực chọn và quản lý tệp tin */}
            <Paper p="lg" radius="md" withBorder style={{ flex: 1 }}>
              <Stack gap="md">
                <Group gap="xs">
                  <IconCloudUpload size={18} color="var(--mantine-primary-color-filled)" />
                  <Text fw={700}>Tệp tin</Text>
                </Group>

                <Grid>
                  {/* Cột trái: khu vực kéo thả / chọn file */}
                  <Grid.Col span={6}>
                    <Box
                      p="xl"
                      style={{
                        border: dragOver
                          ? '2px solid var(--mantine-primary-color-filled)'
                          : '1px dashed var(--mantine-color-default-border)',
                        borderRadius: 12,
                        background: dragOver
                          ? 'var(--mantine-primary-color-light)'
                          : 'var(--mantine-color-default-hover)',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        handleFileSelect(e.dataTransfer.files);
                      }}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        hidden
                        onChange={(e) => handleFileSelect(e.target.files)}
                      />
                      <Stack align="center" gap="xs">
                        <ThemeIcon size={52} radius="xl" variant="light">
                          <IconFileUpload size={26} />
                        </ThemeIcon>
                        <Text size="sm" fw={600}>
                          Kéo và thả tệp tin vào đây
                        </Text>
                        <Text size="xs">
                          hoặc{' '}
                          <Anchor
                            size="xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              fileInputRef.current?.click();
                            }}
                          >
                            duyệt tệp tin
                          </Anchor>
                        </Text>
                        <Text size="xs" c="dimmed">
                          PDF, DOCX, hoặc PPTX tối đa 50MB
                        </Text>
                      </Stack>
                    </Box>
                  </Grid.Col>

                  {/* Cột phải: danh sách file đã chọn */}
                  <Grid.Col span={6}>
                    <Stack gap="xs" style={{ maxHeight: 240, overflowY: 'auto' }}>
                      <Text size="sm" fw={600}>
                        Danh sách tệp ({files.length})
                      </Text>
                      {files.length === 0 ? (
                        <Text size="xs" c="dimmed" ta="center" py="xl">
                          Chưa có tệp nào được chọn
                        </Text>
                      ) : (
                        files.map((file, index) => (
                          <Paper key={index} p="xs" withBorder radius="sm">
                            <Group gap="xs" wrap="nowrap">
                              <IconFile size={16} color="var(--mantine-primary-color-filled)" />
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <Text size="xs" truncate="end">
                                  {file.name}
                                </Text>
                                <Text size="xs" c="dimmed">
                                  {formatSize(file.size)}
                                </Text>
                              </div>
                              <ActionIcon
                                variant="subtle"
                                color="red"
                                size="sm"
                                onClick={() => removeFile(index)}
                              >
                                <IconTrash size={14} />
                              </ActionIcon>
                            </Group>
                          </Paper>
                        ))
                      )}
                    </Stack>
                  </Grid.Col>
                </Grid>

                {/* Nút gửi tài liệu */}
                <Button fullWidth rightSection={<IconSend size={16} />}>
                  Gửi để phê duyệt
                </Button>

                <Text size="xs" c="dimmed" ta="center">
                  Tài liệu sẽ được xem xét bởi người kiểm duyệt trong vòng 24 giờ.
                </Text>
              </Stack>
            </Paper>

            {/* Cảnh báo */}
            <Alert icon={<IconInfoCircle size={16} />} color="brand" variant="light">
              <Text size="xs">
                Đảm bảo tài liệu của bạn không chứa dữ liệu cá nhân nhạy cảm hoặc tài liệu có bản
                quyền khi chưa được phép.
              </Text>
            </Alert>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
