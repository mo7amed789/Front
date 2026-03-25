'use client';

import { Toaster } from 'react-hot-toast';
import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store';
import { QueryProvider } from '@/lib/query/query-provider';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  return (
    <QueryProvider>
      {children}
      <Toaster position="top-right" />
    </QueryProvider>
  );
}
