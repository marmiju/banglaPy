'use client'
import { UserType } from "@/utils/types/types";
import { createContext, useState, ReactNode, useContext } from "react";




type UserContextType = {
  user: UserType | null;
  setUser: (u: UserType | null) => void;
};

// create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};



export default UserProvider;