import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types/unilens';

interface AuthContextType {
  currentUser: UserProfile | null;
  login: (email: string, pass: string) => boolean;
  signup: (userData: Omit<UserProfile, 'id'>) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default pre-seeded demo accounts
const DEFAULT_USERS: UserProfile[] = [
  {
    id: 'usr_1',
    name: 'Rahul Sharma',
    email: 'rahul@unilens.edu',
    password: 'password123',
    role: 'Student',
    department: 'ECE',
    semester: '7th Semester',
    cgpa: '8.84',
    skills: 'Edge AI, Embedded C++, Python, Computer Vision',
    internshipStatus: 'Completed at Bosch R&D',
    placementStatus: 'Seeking Placement',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr_2',
    name: 'Dr. Aarav Sharma',
    email: 'aarav@unilens.edu',
    password: 'password123',
    role: 'Faculty',
    department: 'CSE',
    designation: 'Professor & Head of Research',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr_3',
    name: 'Saamia N',
    email: 'saamia@unilens.edu',
    password: 'password123',
    role: 'Administrator',
    department: 'Central Administration',
    designation: 'Dean of R&D Operations',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr_4',
    name: 'Priya Venkatesh',
    email: 'priya@unilens.edu',
    password: 'password123',
    role: 'Placement Team',
    department: 'Training & Placements',
    organization: 'Campus Placement Cell',
    designation: 'Lead Placement Officer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('unilens_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return DEFAULT_USERS; }
    }
    return DEFAULT_USERS;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('unilens_auth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    // Default logged in as Rahul Sharma initially so dashboard is immediately personalized
    return DEFAULT_USERS[0];
  });

  useEffect(() => {
    localStorage.setItem('unilens_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('unilens_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('unilens_auth_user');
    }
  }, [currentUser]);

  const login = (email: string, pass: string): boolean => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && (!u.password || u.password === pass)
    );
    if (found) {
      setCurrentUser(found);
      return true;
    }
    return false;
  };

  const signup = (userData: Omit<UserProfile, 'id'>): boolean => {
    const exists = users.some((u) => u.email.toLowerCase() === userData.email.toLowerCase());
    if (exists) return false;

    const newUser: UserProfile = {
      ...userData,
      id: `usr_${Date.now()}`,
      avatar: userData.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.name)}`,
    };

    const updated = [...users, newUser];
    setUsers(updated);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...data };
    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
