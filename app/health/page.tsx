'use client';

import { useState } from 'react';
import { getHealth } from '@/api/health';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HealthPage() {
  const [response, setResponse] = useState<string>('No request yet.');
  const [isLoading, setIsLoading] = useState(false);

  const checkHealth = async () => {
    setIsLoading(true);
    try {
      const data = await getHealth();
      setResponse(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
    } catch {
      setResponse('Health check failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center p-4">
      <Card className="space-y-4">
        <h1 className="text-2xl font-semibold">Health</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Check backend health endpoint response from <code>/health</code>.
        </p>
        <Button onClick={checkHealth} isLoading={isLoading}>
          Check health
        </Button>
        <pre className="overflow-auto rounded bg-slate-100 p-3 text-sm dark:bg-slate-800">{response}</pre>
      </Card>
    </main>
  );
}
