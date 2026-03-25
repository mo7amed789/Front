'use client';

import { useMemo, useState } from 'react';
import { authApi } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { Table, TBody, TD, TH, THead } from '@/components/ui/table';
import { useServerQuery } from '@/lib/query/useServerQuery';

type EndpointResult = {
  endpoint: string;
  status: 'idle' | 'success' | 'error';
  payload: string;
};

const endpoints = [
  { label: 'GET /me', fn: () => authApi.me() },
  { label: 'POST /refresh', fn: () => authApi.refresh() },
  { label: 'POST /logout', fn: () => authApi.logout() },
];

export default function ApiTestPage() {
  const { data, isLoading, error, refetch } = useServerQuery(() => authApi.me());
  const [results, setResults] = useState<EndpointResult[]>([]);
  const [activePayload, setActivePayload] = useState<string | null>(null);

  const rows = useMemo(() => {
    return endpoints.map((item) => {
      const existing = results.find((result) => result.endpoint === item.label);
      return {
        ...item,
        status: existing?.status ?? 'idle',
        payload: existing?.payload ?? '-',
      };
    });
  }, [results]);

  const runEndpoint = async (label: string, fn: () => Promise<unknown>) => {
    try {
      const response = await fn();
      const payload = JSON.stringify(response, null, 2);
      setResults((previous) => [
        ...previous.filter((entry) => entry.endpoint !== label),
        { endpoint: label, status: 'success', payload },
      ]);
    } catch (runError) {
      const payload = runError instanceof Error ? runError.message : 'Unknown error';
      setResults((previous) => [
        ...previous.filter((entry) => entry.endpoint !== label),
        { endpoint: label, status: 'error', payload },
      ]);
    }
  };

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">API Test Console</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Smoke test backend auth endpoints from a protected dashboard route.</p>
        </div>
        <Button variant="secondary" onClick={() => void refetch()}>
          Refetch profile
        </Button>
      </header>

      <Card>
        <h2 className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">Current /me payload</h2>
        {isLoading ? <p>Loading...</p> : <pre className="overflow-auto text-xs">{error ?? JSON.stringify(data, null, 2)}</pre>}
      </Card>

      <Card>
        <Table>
          <THead>
            <tr>
              <TH>Endpoint</TH>
              <TH>Status</TH>
              <TH>Action</TH>
            </tr>
          </THead>
          <TBody>
            {rows.map((row) => (
              <tr key={row.label}>
                <TD>{row.label}</TD>
                <TD>{row.status}</TD>
                <TD>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => void runEndpoint(row.label, row.fn)}>
                      Run
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setActivePayload(row.payload)}>
                      View payload
                    </Button>
                  </div>
                </TD>
              </tr>
            ))}
          </TBody>
        </Table>
      </Card>

      <Modal open={Boolean(activePayload)} title="Endpoint payload" onClose={() => setActivePayload(null)}>
        <pre className="max-h-80 overflow-auto rounded-md bg-slate-100 p-3 text-xs dark:bg-slate-800">{activePayload}</pre>
      </Modal>
    </section>
  );
}
