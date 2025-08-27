import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'buyer' | 'investigator' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (email: string, password: string, role: UserRole, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const demoUsers: Record<string, User> = {
  'buyer@demo.com': {
    id: '1',
    email: 'buyer@demo.com',
    role: 'buyer',
    name: 'John Doe'
  },
  'investigator@demo.com': {
    id: '2',
    email: 'investigator@demo.com',
    role: 'investigator',
    name: 'Jane Smith'
  },
  'admin@demo.com': {
    id: '3',
    email: 'admin@demo.com',
    role: 'admin',
    name: 'Admin User'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('openhome_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists and role matches
    const demoUser = demoUsers[email];
    if (demoUser && demoUser.role === role && password === 'demo123') {
      setUser(demoUser);
      localStorage.setItem('openhome_user', JSON.stringify(demoUser));
      setIsLoading(false);
      return true;
    }
    
    // For new users, create account automatically (demo mode)
    if (password === 'demo123') {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        role,
        name: email.split('@')[0]
      };
      setUser(newUser);
      localStorage.setItem('openhome_user', JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (email: string, password: string, role: UserRole, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new user (demo mode)
    const newUser: User = {
      id: Date.now().toString(),
      email,
      role,
      name
    };
    
    setUser(newUser);
    localStorage.setItem('openhome_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('openhome_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
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