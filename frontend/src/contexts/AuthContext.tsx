import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, VerifyTokenResponse } from '../types/types';
import axios from 'axios';
import LoadingScreen from "@/components/ui/LoadingScreen";

const AuthContext = createContext<AuthContextType | null>(null);
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<AuthContextType['user']>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
            const response = await axios.get<VerifyTokenResponse>(`${backendUrl}/api/auth/verify-token`, {
                withCredentials: true
            });

            if (response.data.success && response.data.data?.user) {
                setIsAuthenticated(true);
                setUser(response.data.data.user);
                return true;
            }

            setIsAuthenticated(false);
            setUser(null);
            return false;
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await axios.get(`${backendUrl}/api/auth/logout`, {
                withCredentials: true
            });
            setIsAuthenticated(false);
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, checkAuth, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 