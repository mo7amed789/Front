'use client';

import { create } from 'zustand';
import { authApi } from '@/api/auth';
import { setAccessToken } from '@/lib/auth-token';
import { MeResponse } from '@/types/auth';

interface AuthState {
  token: string | null;
  user: MeResponse | null;
  isAuthenticated: boolean;
  hydrateFromSession: () => void;
  setToken: (token: string | null) => void;
  loadCurrentUser: () => Promise<MeResponse | null>;
  logout: () => Promise<void>;
}

const SESSION_KEY = 'lms_access_token';

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  hydrateFromSession: () => {
    if (typeof window === 'undefined') {
      return;
    }

    const token = window.sessionStorage.getItem(SESSION_KEY);
    if (token) {
      setAccessToken(token);
      set({ token, isAuthenticated: true });
    }
  },
  setToken: (token) => {
    setAccessToken(token);

    if (typeof window !== 'undefined') {
      if (token) {
        window.sessionStorage.setItem(SESSION_KEY, token);
      } else {
        window.sessionStorage.removeItem(SESSION_KEY);
      }
    }

    set({ token, isAuthenticated: Boolean(token), user: token ? get().user : null });
  },
  loadCurrentUser: async () => {
    try {
      const user = await authApi.me();
      set({ user, isAuthenticated: true });
      return user;
    } catch {
      set({ user: null, isAuthenticated: false });
      return null;
    }
  },
  logout: async () => {
    try {
      await authApi.logout();
    } finally {
      setAccessToken(null);
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(SESSION_KEY);
      }
      set({ token: null, user: null, isAuthenticated: false });
    }
  },
}));
