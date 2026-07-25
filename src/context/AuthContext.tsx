import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../lib/api';
import { useToast } from './ToastContext';

interface User {
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const { success, error } = useToast();

  // Silent authentication check on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.post('/api/auth/refresh');
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials: any) => {
    await api.post('/api/auth/login', credentials);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
      success('Logged out successfully');
    } catch (err) {
      error('Failed to logout');
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
