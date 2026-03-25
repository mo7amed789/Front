'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { navigationItems } from '@/features/dashboard/config/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/features/auth/store';

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const role = useAuthStore((state) => state.user?.role ?? 'Student');

  const allowedItems = navigationItems.filter((item) => item.roles.includes(role as (typeof item.roles)[number]));

  return (
    <aside className={cn('border-r border-slate-200 bg-white transition-all dark:border-slate-800 dark:bg-slate-900', collapsed ? 'w-20' : 'w-64')}>
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
        {!collapsed ? <p className="font-semibold">Enterprise Panel</p> : null}
        <Button variant="ghost" size="icon" aria-label="Toggle sidebar" onClick={() => setCollapsed((value) => !value)}>
          <Menu className="size-4" />
        </Button>
      </div>
      <nav aria-label="Primary" className="space-y-1 p-3">
        {allowedItems.map((item) => {
          const ActiveIcon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition',
                active
                  ? 'bg-brand-100 text-brand-700 dark:bg-brand-700/20 dark:text-brand-100'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
              )}
            >
              <ActiveIcon className="size-4" />
              {!collapsed ? <span>{item.label}</span> : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
