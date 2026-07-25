import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../lib/api';

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

  // Silent authentication check on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Attempt to hit the refresh endpoint
        // If a valid refresh cookie exists, it will set a new access token cookie
        await api.post('/api/auth/refresh');
        
        // If successful, we are authenticated! 
        // Note: For a robust app, you might want an endpoint like /api/auth/me to return the exact user details.
        // For LeadDesk Mini, simply setting authenticated to true is enough for the Admin dashboard.
        setIsAuthenticated(true);
      } catch (error) {
        // Refresh failed (no cookie, or expired)
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
    // Ideally set user details here if returned by the login endpoint
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
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
