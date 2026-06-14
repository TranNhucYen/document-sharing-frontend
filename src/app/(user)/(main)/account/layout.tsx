import { AccountShell } from '@/modules/account/components';

export default function AcountLayout({ children }: { children: React.ReactNode }) {
  return <AccountShell>{children}</AccountShell>;
}
