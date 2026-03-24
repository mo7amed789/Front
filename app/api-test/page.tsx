'use client';

import { useState } from 'react';
import { authApi } from '@/api/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { extractMessage } from '@/lib/error-messages';

export default function ApiTestPage() {
  const [log, setLog] = useState<string>('Run an endpoint test.');

  const run = async (label: string, action: () => Promise<unknown>) => {
    setLog(`Running ${label}...`);
    try {
      const response = await action();
      setLog(`${label} success:\n${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      const message = extractMessage({ message: error instanceof Error ? error.message : 'Unknown error' });
      setLog(`${label} failed:\n${message}`);
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl p-4 pt-8">
      <Card className="space-y-4">
        <h1 className="text-2xl font-semibold">API Test Console</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Use demo payloads to verify endpoint responses quickly.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button variant="secondary" onClick={() => run('ME', () => authApi.me())}>GET /api/auth/me</Button>
          <Button variant="secondary" onClick={() => run('REFRESH', () => authApi.refresh())}>POST /api/auth/refresh</Button>
          <Button variant="secondary" onClick={() => run('LOGOUT', () => authApi.logout())}>POST /api/auth/logout</Button>
          <Button variant="secondary" onClick={() => run('VERIFY', () => authApi.verifyEmail('sample-token'))}>GET /verify-email</Button>
          <Button variant="secondary" onClick={() => run('FORGOT', () => authApi.forgotPassword({ email: 'demo@example.com' }))}>POST /forgot-password</Button>
          <Button variant="secondary" onClick={() => run('RESET', () => authApi.resetPassword({ token: 'sample-token', newPassword: 'Password123!' }))}>POST /reset-password</Button>
        </div>
        <pre className="overflow-auto rounded bg-slate-100 p-3 text-xs dark:bg-slate-800">{log}</pre>
      </Card>
    </main>
  );
}
