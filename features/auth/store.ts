'use client';

import { create } from 'zustand';
import { authApi } from '@/api/auth';
import { setAccessToken } from '@/lib/auth-token';
import { MeResponse } from '@/types/auth';

interface AuthState {
  token: string | null;
  user: MeResponse | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  initialize: () => Promise<void>;
  setToken: (token: string | null) => void;
  loadCurrentUser: () => Promise<MeResponse | null>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  initialize: async () => {
    if (get().isInitialized) {
      return;
    }

    try {
      const { token } = await authApi.refresh();
      setAccessToken(token);
      set({ token, isAuthenticated: true });
      await get().loadCurrentUser();
    } catch {
      setAccessToken(null);
      set({ token: null, user: null, isAuthenticated: false });
    } finally {
      set({ isInitialized: true });
    }
  },
  setToken: (token) => {
    setAccessToken(token);
    set({ token, isAuthenticated: Boolean(token), user: token ? get().user : null });
  },
  loadCurrentUser: async () => {
    try {
      const user = await authApi.me();
      set({ user, isAuthenticated: true });
      return user;
    } catch {
      set({ user: null, isAuthenticated: false, token: null });
      setAccessToken(null);
      return null;
    }
  },
  logout: async () => {
    try {
      await authApi.logout();
    } finally {
      setAccessToken(null);
      set({ token: null, user: null, isAuthenticated: false });
    }
  },
}));
