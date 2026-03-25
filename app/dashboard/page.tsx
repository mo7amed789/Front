'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/features/auth/store';
import { useAuthGuard } from '@/hooks/useAuthGuard';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuthGuard();
  const user = useAuthStore((state) => state.user);
  const loadCurrentUser = useAuthStore((state) => state.loadCurrentUser);
  const logout = useAuthStore((state) => state.logout);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!isInitialized || !isAuthenticated) {
        setIsLoading(false);
        return;
      }

      const loadedUser = await loadCurrentUser();
      if (!loadedUser) {
        toast.error('Session expired. Please log in again.');
        router.replace('/login');
      }
      setIsLoading(false);
    };

    void load();
  }, [isAuthenticated, isInitialized, loadCurrentUser, router]);

  if (!isInitialized || isLoading) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center p-4">
        <p>Loading dashboard...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    router.push('/login');
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl p-4 pt-12">
      <Card className="space-y-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        {user ? (
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium text-slate-500">Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Role</dt>
              <dd>{user.role}</dd>
            </div>
          </dl>
        ) : (
          <p>No user data available.</p>
        )}
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </Card>
    </main>
  );
}
