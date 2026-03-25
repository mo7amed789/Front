import { LayoutDashboard, Settings, UserCircle2, FlaskConical } from 'lucide-react';

export type AppRole = 'Admin' | 'Instructor' | 'Student';

export interface NavigationItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  roles: AppRole[];
}

export const navigationItems: NavigationItem[] = [
  {
    href: '/dashboard',
    label: 'Overview',
    icon: LayoutDashboard,
    roles: ['Admin', 'Instructor', 'Student'],
  },
  {
    href: '/dashboard/profile',
    label: 'Profile',
    icon: UserCircle2,
    roles: ['Admin', 'Instructor', 'Student'],
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
    roles: ['Admin', 'Instructor'],
  },
  {
    href: '/dashboard/api-test',
    label: 'API Test',
    icon: FlaskConical,
    roles: ['Admin', 'Instructor'],
  },
];
