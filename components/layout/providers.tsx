'use client';

import { Toaster } from 'react-hot-toast';
import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const hydrate = useAuthStore((state) => state.hydrateFromSession);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      {children}
      <Toaster position="top-right" />
    </>
  );
}
