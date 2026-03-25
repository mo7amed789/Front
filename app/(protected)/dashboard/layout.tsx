'use client';

import { ReactNode } from 'react';
import { DashboardShell } from '@/features/dashboard/components/dashboard-shell';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isInitialized, isAuthenticated } = useAuthGuard();

  if (!isInitialized) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <Skeleton className="mb-4 h-10 w-1/3" />
        <Skeleton className="mb-3 h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <DashboardShell>{children}</DashboardShell>;
}
