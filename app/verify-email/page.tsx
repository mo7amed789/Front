'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { authApi } from '@/api/auth';
import { Card } from '@/components/ui/card';
import { ApiError } from '@/types/auth';
import { formatApiError } from '@/lib/error-messages';

type VerifyStatus = 'idle' | 'loading' | 'success' | 'error';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get('token') ?? '', [searchParams]);
  const [status, setStatus] = useState<VerifyStatus>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Missing verification token.');
        return;
      }

      setStatus('loading');
      try {
        const response = await authApi.verifyEmail(token);
        setMessage(response.message);
        setStatus('success');
      } catch (error) {
        setMessage(formatApiError(error as ApiError));
        setStatus('error');
      }
    };

    void verify();
  }, [token]);

  return (
    <>
      {status === 'loading' && <p>Verifying your email...</p>}
      {status === 'success' && <p className="text-emerald-600">{message}</p>}
      {status === 'error' && <p className="text-red-600">{message}</p>}
    </>
  );
}

export default function VerifyEmailPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center p-4">
      <Card className="space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Verify email</h1>
        <Suspense fallback={<p>Verifying your email...</p>}>
          <VerifyEmailContent />
        </Suspense>
        <Link
          href="/login"
          className="inline-flex min-h-10 items-center justify-center rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
        >
          Go to login
        </Link>
      </Card>
    </main>
  );
}
