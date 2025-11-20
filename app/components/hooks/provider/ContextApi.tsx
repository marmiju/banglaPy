'use client'
import { UserType } from "@/utils/types/types";
import { createContext, useState, ReactNode, useContext } from "react";




type UserContextType = {
  user: UserType | null;
  setUser: (u: UserType | null) => void;
  loading: boolean
 setLoading: (l: boolean) => void;
};

// create context
const UserContext = createContext<UserContextType | undefined>(undefined);


// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
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