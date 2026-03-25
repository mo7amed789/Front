'use client';

import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/features/auth/store';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Profile data resolved from /me endpoint.</p>
      </header>
      <Card className="max-w-xl">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-slate-500">User ID</dt>
            <dd>{user?.userId ?? 'N/A'}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Role</dt>
            <dd>{user?.role ?? 'N/A'}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-medium text-slate-500">Email</dt>
            <dd>{user?.email ?? 'N/A'}</dd>
          </div>
        </dl>
      </Card>
    </section>
  );
}
