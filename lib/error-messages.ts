import { ApiError } from '@/types/auth';

export function formatApiError(error: ApiError): string {
  switch (error.status) {
    case 400:
      return `Bad request: ${error.message}`;
    case 401:
      return 'Unauthorized. Please log in again.';
    case 409:
      return 'Conflict: this resource already exists.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
      return 'Server error. Please try again later.';
    default:
      return error.message || 'Something went wrong';
  }
}

export function extractMessage(input: { message: string } | string): string {
  return typeof input === 'string' ? input : input.message;
}
