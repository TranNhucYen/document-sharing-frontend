export type AdminRole = 'SuperAdmin' | 'Admin' | 'Moderator';

export type DocumentStatus = 'Pending' | 'Approved' | 'Rejected' | 'Hidden';

export interface AdminDocument {
  id: string;
  title: string;
  category: string;
  uploadedBy: string;
  status: DocumentStatus;
  createdAt: string;
  rejectionReason?: string;
  approvedBy?: string;
}

export interface CategoryNode {
  id: string;
  name: string;
  slug: string;
  children: CategoryNode[];
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  active: boolean;
  createdAt: string;
}

export interface RolePermission {
  id: string;
  name: string;
  enabled: boolean;
}

export interface AdminRoleItem {
  id: string;
  name: string;
  description: string;
  usersCount: number;
  permissions: RolePermission[];
}

export interface DocumentStat {
  id: string;
  title: string;
  downloads: number;
  comments: number;
  views: number;
}

export function useCurrentRole(): AdminRole {
  return 'SuperAdmin';
}

export function useAdminStats() {
  return {
    total: 42,
    pending: 8,
    approved: 30,
    rejected: 4,
  };
}

export function useAdminDocuments(): AdminDocument[] {
  return [
    { id: '1', title: 'Hướng dẫn Kiến trúc Kỹ thuật v2.0', category: 'Kỹ thuật', uploadedBy: 'Nguyễn Văn A', status: 'Approved', createdAt: '2025-12-01' },
    { id: '2', title: 'Tài liệu Tham khảo API', category: 'Kỹ thuật', uploadedBy: 'Trần Văn B', status: 'Pending', createdAt: '2025-11-20' },
    { id: '3', title: 'Sách trắng Thiết kế Hệ thống', category: 'Kỹ thuật', uploadedBy: 'Lê Thị C', status: 'Rejected', createdAt: '2025-10-15', rejectionReason: 'Tài liệu trùng lặp với bản đã có', approvedBy: 'Admin' },
    { id: '4', title: 'Sổ tay Thực hành Bảo mật', category: 'Bảo mật', uploadedBy: 'Phạm Văn D', status: 'Approved', createdAt: '2025-09-30' },
    { id: '5', title: 'Chiến lược Di chuyển CSDL', category: 'Kỹ thuật', uploadedBy: 'Hoàng Thị E', status: 'Pending', createdAt: '2025-08-22' },
    { id: '6', title: 'Hướng dẫn Thiết lập DevOps', category: 'Kỹ thuật', uploadedBy: 'Vũ Văn F', status: 'Approved', createdAt: '2025-07-10' },
    { id: '7', title: 'Báo cáo Tài chính Q3', category: 'Kinh doanh', uploadedBy: 'Nguyễn Văn A', status: 'Hidden', createdAt: '2025-06-05' },
    { id: '8', title: 'Phân tích Thị trường 2025', category: 'Kinh doanh', uploadedBy: 'Trần Văn B', status: 'Approved', createdAt: '2025-05-12' },
    { id: '9', title: 'Hướng dẫn Tuân thủ Bảo mật', category: 'Bảo mật', uploadedBy: 'Lê Thị C', status: 'Pending', createdAt: '2025-04-20' },
    { id: '10', title: 'Kiến trúc Microservices', category: 'Kỹ thuật', uploadedBy: 'Phạm Văn D', status: 'Rejected', createdAt: '2025-03-15', rejectionReason: 'Thiếu phần mô tả chi tiết', approvedBy: 'Admin' },
    { id: '11', title: 'Báo cáo Đánh giá Rủi ro', category: 'Bảo mật', uploadedBy: 'Hoàng Thị E', status: 'Approved', createdAt: '2025-02-28' },
    { id: '12', title: 'Kế hoạch Phát triển Sản phẩm', category: 'Kinh doanh', uploadedBy: 'Vũ Văn F', status: 'Pending', createdAt: '2025-02-01' },
  ];
}

export function useCategories(): CategoryNode[] {
  return [
    {
      id: 'cat1', name: 'Khoa học', slug: 'khoa-hoc', children: [
        { id: 'cat1-1', name: 'Toán', slug: 'toan', children: [] },
        { id: 'cat1-2', name: 'Lý', slug: 'ly', children: [] },
      ],
    },
    {
      id: 'cat2', name: 'Văn học', slug: 'van-hoc', children: [
        { id: 'cat2-1', name: 'Tiểu thuyết', slug: 'tieu-thuyet', children: [] },
        { id: 'cat2-2', name: 'Thơ', slug: 'tho', children: [] },
      ],
    },
    {
      id: 'cat3', name: 'Kỹ thuật', slug: 'ky-thuat', children: [
        { id: 'cat3-1', name: 'Kiến trúc', slug: 'kien-truc', children: [] },
        { id: 'cat3-2', name: 'API', slug: 'api', children: [] },
      ],
    },
  ];
}

export function useAdminUsers(): AdminUser[] {
  return [
    { id: '1', email: 'admin@docshare.io', fullName: 'Nguyễn Văn A', roles: ['SuperAdmin'], active: true, createdAt: '2025-01-01' },
    { id: '2', email: 'mod@docshare.io', fullName: 'Trần Văn B', roles: ['Moderator'], active: true, createdAt: '2025-02-15' },
    { id: '3', email: 'user1@docshare.io', fullName: 'Lê Thị C', roles: ['Admin'], active: true, createdAt: '2025-03-10' },
    { id: '4', email: 'user2@docshare.io', fullName: 'Phạm Văn D', roles: ['User'], active: false, createdAt: '2025-04-20' },
    { id: '5', email: 'user3@docshare.io', fullName: 'Hoàng Thị E', roles: ['User'], active: true, createdAt: '2025-05-05' },
  ];
}

const allPermissions: RolePermission[] = [
  { id: 'perm1', name: 'manage DocumentCategory', enabled: true },
  { id: 'perm2', name: 'read User', enabled: true },
  { id: 'perm3', name: 'manage Document', enabled: false },
  { id: 'perm4', name: 'approve Document', enabled: true },
  { id: 'perm5', name: 'manage Role', enabled: false },
  { id: 'perm6', name: 'view AuditLog', enabled: true },
];

export function useRoles(): AdminRoleItem[] {
  return [
    { id: 'role1', name: 'SuperAdmin', description: 'Toàn quyền hệ thống', usersCount: 1, permissions: allPermissions.map(p => ({ ...p, enabled: true })) },
    { id: 'role2', name: 'Admin', description: 'Quản trị viên', usersCount: 3, permissions: allPermissions.map(p => p.id !== 'perm5' ? { ...p, enabled: true } : { ...p, enabled: false }) },
    { id: 'role3', name: 'Moderator', description: 'Kiểm duyệt tài liệu', usersCount: 1, permissions: allPermissions.map(p => p.id === 'perm3' || p.id === 'perm4' ? { ...p, enabled: true } : { ...p, enabled: false }) },
    { id: 'role4', name: 'User', description: 'Người dùng thông thường', usersCount: 10, permissions: allPermissions.map(p => ({ ...p, enabled: false })) },
  ];
}

export function useStatistics(): DocumentStat[] {
  return [
    { id: '1', title: 'Hướng dẫn Kiến trúc Kỹ thuật v2.0', downloads: 1200, comments: 45, views: 5600 },
    { id: '2', title: 'Tài liệu Tham khảo API', downloads: 980, comments: 32, views: 4300 },
    { id: '3', title: 'Sách trắng Thiết kế Hệ thống', downloads: 750, comments: 28, views: 3200 },
    { id: '4', title: 'Sổ tay Thực hành Bảo mật', downloads: 620, comments: 15, views: 2800 },
    { id: '5', title: 'Chiến lược Di chuyển CSDL', downloads: 540, comments: 22, views: 2100 },
    { id: '6', title: 'Hướng dẫn Thiết lập DevOps', downloads: 480, comments: 18, views: 1900 },
    { id: '7', title: 'Báo cáo Tài chính Q3', downloads: 350, comments: 10, views: 1500 },
    { id: '8', title: 'Phân tích Thị trường 2025', downloads: 290, comments: 8, views: 1200 },
    { id: '9', title: 'Hướng dẫn Tuân thủ Bảo mật', downloads: 210, comments: 5, views: 900 },
    { id: '10', title: 'Kiến trúc Microservices', downloads: 180, comments: 12, views: 800 },
  ];
}

export function useRoleNavItems() {
  const role = useCurrentRole();
  const items = [
    { label: 'Bảng điều khiển', icon: 'IconDashboard', href: '/admin/dashboard', roles: ['SuperAdmin', 'Admin'] },
    { label: 'Tài liệu', icon: 'IconFolder', href: '/admin/documents', roles: ['SuperAdmin', 'Admin', 'Moderator'] },
    { label: 'Danh mục', icon: 'IconCategory', href: '/admin/categories', roles: ['SuperAdmin', 'Admin'] },
    { label: 'Người dùng', icon: 'IconUsers', href: '/admin/users', roles: ['SuperAdmin'] },
    { label: 'Vai trò', icon: 'IconShield', href: '/admin/roles', roles: ['SuperAdmin', 'Admin'] },
    { label: 'Nhật ký', icon: 'IconHistory', href: '/admin/audit', roles: ['SuperAdmin', 'Admin'] },
    { label: 'Thống kê', icon: 'IconChartBar', href: '/admin/statistics', roles: ['SuperAdmin', 'Admin'] },
  ];
  return items.filter(item => item.roles.includes(role));
}
