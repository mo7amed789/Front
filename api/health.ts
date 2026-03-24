import { AxiosError } from 'axios';
import api from '@/api/client';
import { ApiError } from '@/types/auth';
import { HealthResponse } from '@/types/health';

function toApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    return {
      status: error.response?.status,
      message: error.message,
      details: error.response?.data,
    };
  }

  return {
    message: 'Unexpected health request error',
    details: error,
  };
}

export async function getHealth(): Promise<HealthResponse> {
  try {
    const { data } = await api.get<HealthResponse>('/health');
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
