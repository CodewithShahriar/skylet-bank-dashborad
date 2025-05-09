
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

// Define user type
type User = {
  id: string;
  username: string;
  name: string;
  avatar?: string;
};

// Define auth context type
type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

// Creating the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default test user
const TEST_USER: User = {
  id: '12345',
  username: 'AbidShahriar',
  name: 'Abid Shahriar',
  avatar: 'https://i.ibb.co.com/JRVphK0J/Whats-App-Image-2024-01-13-at-17-24-46-48b3caa5-modified.png',
};

// Test credentials
const TEST_CREDENTIALS = {
  username: 'testuser',
  password: '123456',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    // Check localStorage for auth token/user data
    const storedUser = localStorage.getItem('skylet_user');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('skylet_user');
      }
    }
    
    setIsLoading(false);
  }, []);

  // Login function - returns true if successful
  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Adding a slight delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (username === TEST_CREDENTIALS.username && password === TEST_CREDENTIALS.password) {
      setUser(TEST_USER);
      localStorage.setItem('skylet_user', JSON.stringify(TEST_USER));
      setIsLoading(false);
      toast({
        title: "লগইন সফল হয়েছে",
        description: "আপনি সফলভাবে লগইন করেছেন",
      });
      return true;
    }
    
    setIsLoading(false);
    toast({
      title: "লগইন ব্যর্থ হয়েছে",
      description: "ইউজারনেম বা পাসওয়ার্ড ভুল",
      variant: "destructive"
    });
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('skylet_user');
    navigate('/login');
    toast({
      title: "লগআউট সফল হয়েছে",
      description: "আপনি সফলভাবে লগআউট করেছেন",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
