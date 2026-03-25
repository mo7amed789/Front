import { AxiosError } from 'axios';
import api from '@/api/client';
import {
  ApiEnvelope,
  ApiError,
  ForgotPasswordRequest,
  LoginRequest,
  MeResponse,
  MessageResponse,
  RegisterData,
  RegisterRequest,
  ResetPasswordRequest,
  TokenResponse,
} from '@/types/auth';

function toApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const payload = error.response?.data;

    if (typeof payload === 'string') {
      return { status, message: payload, details: payload };
    }

    if (payload && typeof payload === 'object') {
      const message =
        (payload as { message?: string; title?: string }).message ??
        (payload as { title?: string }).title ??
        'Request failed';
      return { status, message, details: payload };
    }

    return { status, message: error.message || 'Request failed' };
  }

  return { message: 'Unexpected error', details: error };
}

export const authApi = {
  async register(payload: RegisterRequest): Promise<ApiEnvelope<RegisterData>> {
    try {
      const { data } = await api.post<ApiEnvelope<RegisterData>>('/register', payload);
      return data;
    } catch (error) {
      throw toApiError(error);
    }
  },

  async login(payload: LoginRequest): Promise<TokenResponse> {
    try {
      const { data } = await api.post<TokenResponse>('/login', payload);
      return data;
    } catch (error) {
      throw toApiError(error);
    }
  },

  async me(): Promise<MeResponse> {
    try {
      const { data } = await api.get<MeResponse>('/me');
      return data;
    } catch (error) {
      throw toApiError(error);
    }
  },

  async refresh(): Promise<TokenResponse> {
    try {
      const { data } = await api.post<TokenResponse>('/refresh', {});
      return data;
    } catch (error) {
      throw toApiError(error);
    }
  },

  async logout(): Promise<MessageResponse | string> {
    try {
      const { data } = await api.post<MessageResponse | string>('/logout', {});
      return data;
    } catch (error) {
      throw toApiError(error);
    }
  },

  async verifyEmail(token: string): Promise<MessageResponse> {
    try {
      const { data } = await api.get<MessageResponse>('/verify-email', {
        params: { token },
      });
      return data;
    } catch (error) {
      throw toApiError(error);
    }
  },

  async forgotPassword(payload: ForgotPasswordRequest): Promise<MessageResponse | string> {
    try {
      const { data } = await api.post<MessageResponse | string>('/forgot-password', payload);
      return data;
    } catch (error) {
      throw toApiError(error);
    }
  },

  async resetPassword(payload: ResetPasswordRequest): Promise<MessageResponse | string> {
    try {
      const { data } = await api.post<MessageResponse | string>('/reset-password', payload);
      return data;
    } catch (error) {
      throw toApiError(error);
    }
  },
};
