import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add auth token to requests if it exists
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

// Cookie configuration
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  path: '/',
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production'
};

export const authApi = {
  signUp: async (data: SignUpData): Promise<AuthResponse> => {
    const response = await api.post('/users/signup', data);
    const { token, user } = response.data;
    Cookies.set('token', token, COOKIE_OPTIONS);
    Cookies.set('userId', user.id, COOKIE_OPTIONS);
    return response.data;
  },

  signIn: async (data: SignInData): Promise<AuthResponse> => {
    const response = await api.post('/users/signin', data);
    const { token, user } = response.data;
    Cookies.set('token', token, COOKIE_OPTIONS);
    Cookies.set('userId', user.id, COOKIE_OPTIONS);
    return response.data;
  },

  signOut: () => {
    Cookies.remove('token', { path: '/' });
    Cookies.remove('userId', { path: '/' });
  },

  getProfile: async (): Promise<AuthResponse['user']> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<AuthResponse['user']>) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },
}; 

export interface Character {
  id: string;
  name: string;
  description: string;
  personality: string;
  imageUrl: string;
  rating: number;
  interactions: number;
  trending: boolean;
  status: string;
}

export const characterApi = {
  async getAllCharacters(): Promise<Character[]> {
     try {
      const response = await api.get('/characters/all-characters');
      return response.data;
     } catch (error) {
      console.log(error);
      throw error;
     }
  },

  async getCharacterById(id: string): Promise<Character> {
    try {
      const response = await api.get(`/characters/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getCharactersByUserId(userId: string): Promise<Character[]> {
    try {
      const response = await api.get(`/characters/user/${userId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}