import { create } from 'zustand';
import { toast } from 'sonner';
import { authApi, type AuthResponse } from '../services/api';
import Cookies from 'js-cookie';

interface AuthState {
  user: AuthResponse['user'] | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  loadUser: () => Promise<void>;
  updateProfile: (data: { name?: string; email?: string }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: !!Cookies.get('token'),

  loadUser: async () => {
    const token = Cookies.get('token');
    if (!token) {
      set({ user: null, isAuthenticated: false });
      return;
    }

    try {
      const user = await authApi.getProfile();
      set({ user, isAuthenticated: true });
    } catch (error) {
      authApi.signOut();
      set({ user: null, isAuthenticated: false });
    }
  },

  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.signIn({ email, password });
      set({ user: response.user, isAuthenticated: true, isLoading: false });
      toast.success('Signed in successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to sign in';
      set({ error: message, isLoading: false, isAuthenticated: false });
      toast.error(message);
      throw error;
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.signUp({ email, password, name });
      set({ user: response.user, isAuthenticated: true, isLoading: false });
      toast.success('Account created successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to sign up';
      set({ error: message, isLoading: false, isAuthenticated: false });
      toast.error(message);
      throw error;
    }
  },

  signOut: () => {
    authApi.signOut();
    set({ user: null, isAuthenticated: false });
    toast.success('Signed out successfully');
  },

  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authApi.updateProfile(data);
      set({ user, isLoading: false });
      toast.success('Profile updated successfully');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update profile';
      set({ error: message, isLoading: false });
      toast.error(message);
      throw error;
    }
  },
})); 