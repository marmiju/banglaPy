'use client'
import { createContext, useState, ReactNode, useContext, useEffect } from "react";

// Context shape
type UserType = {
  id: string;
  username?: string;
  email?: string;
  googleId: string;
  profile_picture?: string;
};

type UserContextType = {
  user: UserType | null;
  setUser: (u: UserType | null) => void;
};

// create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<UserType | null>(null);

  // Save user to localStorage whenever it changes
  const setUser = (u: UserType | null) => {
    if (u) {
      localStorage.setItem("user", JSON.stringify(u));
    } else {
      localStorage.removeItem("user");
    }
    setUserState(u);
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUserState(JSON.parse(saved));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export default UserProvider;
