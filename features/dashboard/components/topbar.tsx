'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/features/auth/store';

export function Topbar() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    router.replace('/login');
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Signed in as</p>
        <p className="font-medium">{user?.email ?? 'Unknown user'}</p>
      </div>
      <Button variant="danger" size="sm" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}
