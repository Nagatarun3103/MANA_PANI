import { createContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '@/services/api'; // Import the api instance

interface AuthState {
  token: string | null;
  user: any | null;
  role: string | null;
}

interface AuthContextType {
    auth: AuthState;
    setAuth: (auth: AuthState) => void;
    isAdmin: boolean;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthState>({
        token: localStorage.getItem('auth_token'),
        user: null,
        role: null,
    });
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        if (auth.token) {
            try {
                const decodedUser: any = jwtDecode(auth.token);
                setAuth(prev => ({ ...prev, user: decodedUser, role: decodedUser.role }));
                setIsAdmin(decodedUser.role === 'admin');
                api.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
            } catch (error) {
                console.error("Invalid token");
                logout();
            }
        } else {
            setAuth({ token: null, user: null, role: null });
            setIsAdmin(false);
            delete api.defaults.headers.common['Authorization'];
        }
    }, [auth.token]);

    const login = (newAuth: AuthState) => {
        localStorage.setItem('auth_token', newAuth.token!);
        setAuth(newAuth);
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setAuth({ token: null, user: null, role: null });
    };

    const setAuthAndStore = (newAuth: AuthState) => {
        if (newAuth.token) {
            localStorage.setItem('auth_token', newAuth.token);
        } else {
            localStorage.removeItem('auth_token');
        }
        setAuth(newAuth);
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth: setAuthAndStore, isAdmin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
