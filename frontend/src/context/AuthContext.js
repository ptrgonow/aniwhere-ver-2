import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get(
                    `${API_ENDPOINTS.USER_SESSION_CHECK}`,
                    { withCredentials: true }
                );
                if (response.status === 200) {
                    const savedUserId = localStorage.getItem('userId');
                    if (savedUserId) {
                        setIsLoggedIn(true);
                        setUser({ id: savedUserId });
                    } else {
                        setIsLoggedIn(false);
                    }
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('세션 체크 실패:', error);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, []);

    const login = (userId) => {
        setIsLoggedIn(true);
        setUser({ id: userId });
        localStorage.setItem('userId', userId);
        console.log('로그인 성공:', userId);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('userId');
        console.log('로그아웃 성공');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
