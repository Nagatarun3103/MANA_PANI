import { createContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api'; // Import the api instance

interface AuthContextType {
    authTokens: { token: string | null; user: any | null; };
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
                // Set Authorization header for all future requests
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } catch (error) {
                console.error("Invalid token");
                logout();
            }
        } else {
            setUser(null);
            // Remove Authorization header if no token
            delete api.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ authTokens: { token, user }, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
