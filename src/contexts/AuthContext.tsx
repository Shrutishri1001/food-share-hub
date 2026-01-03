import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole = 'admin' | 'donor' | 'consumer' | 'volunteer';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  location: string;
  role: UserRole;
  organizationName?: string;
  organizationType?: string;
  foodSafetyLicenseId?: string;
  hygieneDeclaration?: boolean;
  dailyIntakeCapacity?: number;
  storageFacility?: boolean;
  vehicleType?: string;
  availability?: string;
  preferredPickupRadius?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: Partial<User> & { password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: Map<string, User & { password: string }> = new Map([
  ['admin@foodshare.com', {
    id: '1',
    email: 'admin@foodshare.com',
    password: 'admin123',
    fullName: 'System Administrator',
    phone: '+1234567890',
    location: 'Central Office',
    role: 'admin' as UserRole,
  }],
  ['donor@test.com', {
    id: '2',
    email: 'donor@test.com',
    password: 'donor123',
    fullName: 'John Donor',
    phone: '+1234567891',
    location: 'Downtown Restaurant',
    role: 'donor' as UserRole,
    organizationName: 'Fresh Bites Restaurant',
    organizationType: 'Restaurant',
    foodSafetyLicenseId: 'FSL-12345',
    hygieneDeclaration: true,
  }],
  ['consumer@test.com', {
    id: '3',
    email: 'consumer@test.com',
    password: 'consumer123',
    fullName: 'Jane Consumer',
    phone: '+1234567892',
    location: 'East Side Shelter',
    role: 'consumer' as UserRole,
    organizationName: 'Hope Shelter',
    organizationType: 'Shelter',
    dailyIntakeCapacity: 150,
    storageFacility: true,
  }],
  ['volunteer@test.com', {
    id: '4',
    email: 'volunteer@test.com',
    password: 'volunteer123',
    fullName: 'Bob Volunteer',
    phone: '+1234567893',
    location: 'City Center',
    role: 'volunteer' as UserRole,
    vehicleType: 'Van',
    availability: 'Morning',
    preferredPickupRadius: '10km',
  }],
]);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('foodshare_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const storedUser = mockUsers.get(email.toLowerCase());
    
    if (!storedUser) {
      return { success: false, error: 'User not found. Please check your email or register.' };
    }

    if (storedUser.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const { password: _, ...userWithoutPassword } = storedUser;
    setUser(userWithoutPassword);
    localStorage.setItem('foodshare_user', JSON.stringify(userWithoutPassword));
    
    return { success: true };
  }, []);

  const register = useCallback(async (userData: Partial<User> & { password: string }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!userData.email || !userData.password || !userData.role) {
      return { success: false, error: 'Missing required fields.' };
    }

    if (userData.role === 'admin') {
      return { success: false, error: 'Admin registration is not allowed.' };
    }

    if (mockUsers.has(userData.email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email: userData.email.toLowerCase(),
      password: userData.password,
      fullName: userData.fullName || '',
      phone: userData.phone || '',
      location: userData.location || '',
      role: userData.role,
      ...(userData.role === 'donor' && {
        organizationName: userData.organizationName,
        organizationType: userData.organizationType,
        foodSafetyLicenseId: userData.foodSafetyLicenseId,
        hygieneDeclaration: userData.hygieneDeclaration,
      }),
      ...(userData.role === 'consumer' && {
        organizationName: userData.organizationName,
        organizationType: userData.organizationType,
        dailyIntakeCapacity: userData.dailyIntakeCapacity,
        storageFacility: userData.storageFacility,
      }),
      ...(userData.role === 'volunteer' && {
        vehicleType: userData.vehicleType,
        availability: userData.availability,
        preferredPickupRadius: userData.preferredPickupRadius,
      }),
    };

    mockUsers.set(userData.email.toLowerCase(), newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('foodshare_user', JSON.stringify(userWithoutPassword));
    
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('foodshare_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
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
