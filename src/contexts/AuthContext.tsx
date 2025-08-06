'use client';

import React, { createContext, useContext, useReducer, useEffect, useRef, useCallback } from 'react';

// Types
interface Admin {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'superadmin';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  isAuthenticated: boolean;
  admin: Admin | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  admin: null,
  loading: true,
  error: null,
};

// Actions
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: Admin }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'CLEAR_ERROR' }
  | { type: 'REFRESH_TOKEN_SUCCESS'; payload: Admin };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        admin: action.payload,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        admin: null,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        admin: null,
        loading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'REFRESH_TOKEN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        admin: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
console.log('API_BASE_URL:', API_BASE_URL);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const accessTokenRef = useRef<string | null>(null);

  // API helper function
  const apiCall = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      credentials: 'include', // Include cookies
      headers: {
        'Content-Type': 'application/json',
        ...(accessTokenRef.current && { Authorization: `Bearer ${accessTokenRef.current}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  }, []);

  // Refresh token function
  const refreshToken = useCallback(async () => {
    try {
      const data = await apiCall('/api/admin/refresh', {
        method: 'POST',
      });

      accessTokenRef.current = data.data.accessToken;
      localStorage.setItem('accessToken', data.data.accessToken);

      // Get updated profile
      const profileData = await apiCall('/api/admin/profile');
      dispatch({ type: 'REFRESH_TOKEN_SUCCESS', payload: profileData.data.admin });
    } catch (error) {
      console.error('Token refresh failed:', error);
      accessTokenRef.current = null;
      localStorage.removeItem('accessToken');
      dispatch({ type: 'LOGOUT' });
      throw error;
    }
  }, [apiCall]);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    console.log('Attempting login with email:', email);
    if (!email || !password) {
        throw new Error('Email and password are required');
        }
    try {
      dispatch({ type: 'LOGIN_START' });

      const data = await apiCall('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      accessTokenRef.current = data.data.accessToken;
      localStorage.setItem('accessToken', data.data.accessToken);
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.data.admin });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  }, [apiCall]);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await apiCall(`/api/admin/logout`, { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      accessTokenRef.current = null;
      localStorage.removeItem('accessToken');
      dispatch({ type: 'LOGOUT' });
    }
  }, [apiCall]);

  // Clear error function
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('accessToken');
      
      if (storedToken) {
        accessTokenRef.current = storedToken;
        try {
          await refreshToken();
        } catch (error) {
          console.error('Auth initialization failed:', error);
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, [refreshToken]);

  // Auto refresh token before expiry
  useEffect(() => {
    if (!state.isAuthenticated) return;

    const interval = setInterval(async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error('Auto refresh failed:', error);
      }
    }, 14 * 60 * 1000); // Refresh every 14 minutes (token expires in 15 minutes)

    return () => clearInterval(interval);
  }, [state.isAuthenticated, refreshToken]);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    refreshToken,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
