import React, { createContext, useEffect, useState } from "react";
import { User } from "../types/auth.types";

interface AuthContextProps {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: any;
    setToken: any;
}

export const AuthContext = createContext<AuthContextProps>(
    {} as AuthContextProps
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        // If token is empty or malformed, logout
        if (!storedToken || storedToken.split(".").length !== 3) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setIsLoading(false);
            return;
        }

        try {
            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
        } catch (err) {
            console.error("Error parsing stored user or token", err);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = (user: User, token: string) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const isAdmin = user?.type === "ADMIN";

    return (
        <AuthContext.Provider
            value={{
        user,
            token,
            login,
            logout,
            isAuthenticated: !!user,
            isAdmin,
            isLoading,
            setToken,
    }}
>
    {children}
    </AuthContext.Provider>
);
};
