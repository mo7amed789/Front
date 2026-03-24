export type Role = 'Admin' | 'Instructor' | 'Student' | string;

export interface ApiEnvelope<T> {
  isSuccess?: boolean;
  message?: string;
  data?: T;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterData {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  token: string;
}

export interface MeResponse {
  userId: string;
  email: string;
  role: Role;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface MessageResponse {
  message: string;
}

export interface ApiError {
  message: string;
  status?: number;
  details?: unknown;
}
