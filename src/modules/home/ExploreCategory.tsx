'use client';
import { Container, Title } from '@mantine/core';
import DocumentGrid from '@/components/DocumentGrid';
import { useSampleDocuments } from '@/modules/docs/hooks/useDocs';

export default function ExploreCategory() {
  const sampleDocuments = useSampleDocuments();
  return (
    <Container size="xl" py="xl">
      <Title order={2} mb="lg">
        Danh mục khám phá
      </Title>
      <DocumentGrid items={sampleDocuments} cols={4} scroll={false} />
    </Container>
  );
}
