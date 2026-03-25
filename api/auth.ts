import api from '@/api/client';
import { mapApiError } from '@/lib/api/error-map';
import {
  ApiEnvelope,
  ForgotPasswordRequest,
  LoginRequest,
  MeResponse,
  MessageResponse,
  RegisterData,
  RegisterRequest,
  ResetPasswordRequest,
  TokenResponse,
} from '@/types/auth';

export const authApi = {
  async register(payload: RegisterRequest): Promise<ApiEnvelope<RegisterData>> {
    try {
      const { data } = await api.post<ApiEnvelope<RegisterData>>('/register', payload);
      return data;
    } catch (error) {
      throw mapApiError(error);
    }
  },

  async login(payload: LoginRequest): Promise<TokenResponse> {
    try {
      const { data } = await api.post<TokenResponse>('/login', payload);
      return data;
    } catch (error) {
      throw mapApiError(error);
    }
  },

  async me(): Promise<MeResponse> {
    try {
      const { data } = await api.get<MeResponse>('/me');
      return data;
    } catch (error) {
      throw mapApiError(error);
    }
  },

  async refresh(): Promise<TokenResponse> {
    try {
      const { data } = await api.post<TokenResponse>('/refresh', {});
      return data;
    } catch (error) {
      throw mapApiError(error);
    }
  },

  async logout(): Promise<MessageResponse | string> {
    try {
      const { data } = await api.post<MessageResponse | string>('/logout', {});
      return data;
    } catch (error) {
      throw mapApiError(error);
    }
  },

  async verifyEmail(token: string): Promise<MessageResponse> {
    try {
      const { data } = await api.get<MessageResponse>('/verify-email', {
        params: { token },
      });
      return data;
    } catch (error) {
      throw mapApiError(error);
    }
  },

  async forgotPassword(payload: ForgotPasswordRequest): Promise<MessageResponse | string> {
    try {
      const { data } = await api.post<MessageResponse | string>('/forgot-password', payload);
      return data;
    } catch (error) {
      throw mapApiError(error);
    }
  },

  async resetPassword(payload: ResetPasswordRequest): Promise<MessageResponse | string> {
    try {
      const { data } = await api.post<MessageResponse | string>('/reset-password', payload);
      return data;
    } catch (error) {
      throw mapApiError(error);
    }
  },
};
