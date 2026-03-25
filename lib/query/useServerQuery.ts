'use client';

import { useCallback, useEffect, useState } from 'react';

interface QueryState<TData> {
  data: TData | null;
  error: string | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export function useServerQuery<TData>(queryFn: () => Promise<TData>): QueryState<TData> {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await queryFn();
      setData(response);
    } catch (queryError) {
      const message = queryError instanceof Error ? queryError.message : 'Failed to fetch data';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [queryFn]);

  useEffect(() => {
    void execute();
  }, [execute]);

  return { data, error, isLoading, refetch: execute };
}
