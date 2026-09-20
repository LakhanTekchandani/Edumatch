import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  loginAsStudent: (email?: string, name?: string) => void;
  loginAsInstitute: (email?: string, instituteId?: string) => void;
  logout: () => void;
  registerStudent: (data: { name: string; email: string; mobile: string }) => void;
  registerInstitute: (data: { name: string; email: string; phone: string }) => { user: User; instituteId: string };
  switchRole: (newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_AUTH = 'edumatch_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_AUTH);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_AUTH, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_AUTH);
    }
  }, [user]);

  const role: UserRole = user ? user.role : 'visitor';
  const isAuthenticated = user !== null;

  const loginAsStudent = (email = 'student@edumatch.com', name = 'Aman Deep') => {
    const studentUser: User = {
      id: 'usr-student-1',
      email,
      name,
      role: 'student',
      mobile: '+91 98765 00112'
    };
    setUser(studentUser);
  };

  const loginAsInstitute = (email = 'admissions@apexkota.edu.in', instituteId = 'inst-1') => {
    const instUser: User = {
      id: 'usr-inst-1',
      email,
      name: 'Apex Academy Admin',
      role: 'institute',
      instituteId,
      mobile: '+91 98765 43210'
    };
    setUser(instUser);
  };

  const logout = () => {
    setUser(null);
  };

  const registerStudent = (data: { name: string; email: string; mobile: string }) => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      email: data.email,
      name: data.name,
      role: 'student',
      mobile: data.mobile
    };
    setUser(newUser);
  };

  const registerInstitute = (data: { name: string; email: string; phone: string }) => {
    const newInstId = 'inst-' + Date.now();
    const newUser: User = {
      id: 'usr-' + Date.now(),
      email: data.email,
      name: data.name,
      role: 'institute',
      instituteId: newInstId,
      mobile: data.phone
    };
    setUser(newUser);
    return { user: newUser, instituteId: newInstId };
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'visitor') {
      setUser(null);
    } else if (newRole === 'student') {
      loginAsStudent();
    } else if (newRole === 'institute') {
      loginAsInstitute();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        loginAsStudent,
        loginAsInstitute,
        logout,
        registerStudent,
        registerInstitute,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
