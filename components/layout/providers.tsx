'use client';

import { Toaster } from 'react-hot-toast';
import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  return (
    <>
      {children}
      <Toaster position="top-right" />
    </>
  );
}
