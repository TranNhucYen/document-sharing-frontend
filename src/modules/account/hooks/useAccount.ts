import { IconBell, IconClock, IconShield, IconUser } from '@tabler/icons-react';

export type NotificationType = 'success' | 'info' | 'warning';

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  type: NotificationType;
  time: string;
}

export function useNavItems() {
  return [
    { label: 'Hồ sơ', icon: IconUser, href: '/account' },
    { label: 'Bảo mật', icon: IconShield, href: '/account/security' },
    { label: 'Thông báo', icon: IconBell, href: '/account/notifications' },
    // { label: 'Hoạt động', icon: IconClock, href: '/account/activity' },
  ];
}

export function useNotifications(): NotificationItem[] {
  return [
    {
      id: '1',
      title: 'Tải lên tài liệu thành công',
      content: 'Báo cáo quý của bạn đã được tải lên và xử lý thành công.',
      type: 'success',
      time: '2 phút trước',
    },

    {
      id: '2',
      title: 'Nhận được bình luận mới',
      content: 'Nguyễn Văn A đã bình luận về "Project Roadmap.pdf": "Vui lòng xem lại phần tiến độ."',
      type: 'info',
      time: '1 giờ trước',
    },
    {
      id: '3',
      title: 'Cảnh báo giới hạn lưu trữ',
      content: 'Bạn đã sử dụng 85% dung lượng lưu trữ được cấp. Hãy cân nhắc lưu trữ các tài liệu cũ.',
      type: 'warning',
      time: '3 giờ trước',
    },
    {
      id: '4',
      title: 'Đã cập nhật quyền',
      content: 'Quản trị viên đã cấp cho bạn quyền biên tập viên đối với thư mục "Tài chính".',
      type: 'success',
      time: '1 ngày trước',
    },
  ];
}

export function useRecentActivity() {
  return [
    ['Đã tải lên', 'Báo cáo Tài chính Q3', '2 giờ trước • Thư mục Tài chính'],
    ['Đã cập nhật', 'Ảnh đại diện', 'Hôm qua • Cài đặt tài khoản'],
    ['Đã chỉnh sửa', 'Project Roadmap.pdf', '3 ngày trước • Kế hoạch'],
  ] as [string, string, string][];
}

export function useUserProfile() {
  return {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@docshare.io',
    role: 'Cộng tác viên nội dung',
  };
}
