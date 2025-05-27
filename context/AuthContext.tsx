import { createContext } from "react";
interface AuthContextType {
    user: any | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);