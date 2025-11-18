"use client"
import { createContext, ReactNode, useContext, useState } from "react";


interface learnContextType {
    res_index: number
    setres_index: (e: number) => void;
}

const ResContext = createContext<learnContextType | undefined>(undefined)

 const Learnprovider = ({ children }: { children: ReactNode }) => {
    const [res_index, setres_index] = useState<number>(0)

    return <ResContext.Provider value={{ res_index, setres_index }} >
        {children}
    </ResContext.Provider>

}


export const useResContext = () => {
    const context = useContext(ResContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
}


export default Learnprovider