'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store';

interface GuardOptions {
  redirectTo?: string;
  requiredRoles?: string[];
}

export function useAuthGuard(options?: GuardOptions) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const role = useAuthStore((state) => state.user?.role);

  useEffect(() => {
    const redirectPath = options?.redirectTo ?? '/login';

    if (isInitialized && !isAuthenticated) {
      router.replace(redirectPath);
      return;
    }

    if (
      isInitialized &&
      isAuthenticated &&
      options?.requiredRoles &&
      role &&
      !options.requiredRoles.includes(role)
    ) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isInitialized, options?.redirectTo, options?.requiredRoles, role, router]);

  return { isAuthenticated, isInitialized, role };
}
