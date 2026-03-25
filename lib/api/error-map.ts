import { AxiosError } from 'axios';

export interface AppApiError {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}

export function mapApiError(error: unknown): AppApiError {
  if (error instanceof AxiosError) {
    const payload = error.response?.data;

    if (payload && typeof payload === 'object') {
      const objectPayload = payload as Record<string, unknown>;
      const message =
        typeof objectPayload.message === 'string'
          ? objectPayload.message
          : typeof objectPayload.title === 'string'
            ? objectPayload.title
            : error.message;

      return {
        message,
        status: error.response?.status,
        code: typeof objectPayload.code === 'string' ? objectPayload.code : undefined,
        details: payload,
      };
    }

    return {
      message: error.message,
      status: error.response?.status,
      details: payload,
    };
  }

  return {
    message: error instanceof Error ? error.message : 'Unexpected error occurred',
    details: error,
  };
}
