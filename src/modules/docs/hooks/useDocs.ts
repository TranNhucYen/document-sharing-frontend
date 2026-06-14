import type { DocumentItem } from '@/components/DocumentGrid';

const sampleDocuments: DocumentItem[] = [
  {
    id: '1',
    image: 'https://placehold.co/400x160/indigo/white?text=Doc+1',
    name: 'Hướng dẫn Kiến trúc Kỹ thuật v2.0',
    author: 'Nguyễn Văn A',
    publishedAt: '2025-12-01',
    rating: 5,
  },
  {
    id: '2',
    image: 'https://placehold.co/400x160/teal/white?text=Doc+2',
    name: 'Tài liệu Tham khảo API',
    author: 'Trần Văn B',
    publishedAt: '2025-11-20',
    rating: 4,
  },
  {
    id: '3',
    image: 'https://placehold.co/400x160/orange/white?text=Doc+3',
    name: 'Sách trắng Thiết kế Hệ thống',
    author: 'Lê Thị C',
    publishedAt: '2025-10-15',
    rating: 3,
  },
  {
    id: '4',
    image: 'https://placehold.co/400x160/pink/white?text=Doc+4',
    name: 'Sổ tay Thực hành Bảo mật',
    author: 'Phạm Văn D',
    publishedAt: '2025-09-30',
    rating: 5,
  },
  {
    id: '5',
    image: 'https://placehold.co/400x160/cyan/white?text=Doc+5',
    name: 'Chiến lược Di chuyển CSDL',
    author: 'Hoàng Thị E',
    publishedAt: '2025-08-22',
    rating: 2,
  },
  {
    id: '6',
    image: 'https://placehold.co/400x160/violet/white?text=Doc+6',
    name: 'Hướng dẫn Thiết lập DevOps',
    author: 'Vũ Văn F',
    publishedAt: '2025-07-10',
    rating: 4,
  },
  {
    id: '7',
    image: 'https://placehold.co/400x160/indigo/white?text=Doc+1',
    name: 'Hướng dẫn Kiến trúc Kỹ thuật v2.0',
    author: 'Nguyễn Văn A',
    publishedAt: '2025-12-01',
    rating: 1,
  },
  {
    id: '8',
    image: 'https://placehold.co/400x160/teal/white?text=Doc+2',
    name: 'Tài liệu Tham khảo API',
    author: 'Trần Văn B',
    publishedAt: '2025-11-20',
    rating: 3,
  },
  {
    id: '9',
    image: 'https://placehold.co/400x160/orange/white?text=Doc+3',
    name: 'Sách trắng Thiết kế Hệ thống',
    author: 'Lê Thị C',
    publishedAt: '2025-10-15',
    rating: 5,
  },
];

const searchSuggestions: string[] = [
  'Hướng dẫn Kiến trúc Kỹ thuật v2.0',
  'Tài liệu Tham khảo API',
  'Sách trắng Thiết kế Hệ thống',
  'Sổ tay Thực hành Bảo mật',
  'Chiến lược Di chuyển Cơ sở dữ liệu',
];

export function useSampleDocuments(): DocumentItem[] {
  return sampleDocuments;
}

export function useSearchSuggestions(): string[] {
  return searchSuggestions;
}

export function useCategoryOptions(): Record<string, string[]> {
  return {
    'Kỹ thuật': ['Kiến trúc', 'API', 'Cơ sở dữ liệu', 'DevOps'],
    'Bảo mật': ['Bảo mật mạng', 'Bảo mật ứng dụng', 'Tuân thủ'],
    'Kinh doanh': ['Báo cáo', 'Chiến lược', 'Phân tích thị trường'],
  };
}

export function useDocImages(): string[] {
  return ['/doc-detail.png', '/doc-detail.png', '/doc-detail.png'];
}
