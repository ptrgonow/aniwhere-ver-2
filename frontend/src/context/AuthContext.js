import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get(
                    `${API_ENDPOINTS.USER_SESSION_CHECK}`,
                    { withCredentials: true }
                );
                if (response.status === 200) {
                    const savedUserName = localStorage.getItem('userName');
                    if (savedUserName) {
                        setIsLoggedIn(true);
                        setUserName(savedUserName);
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


    const login = (userName) => {
        setIsLoggedIn(true);
        setUserName(userName);
        localStorage.setItem('userName', userName);
        console.log('로그인 성공:', userName);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserName('');
        localStorage.removeItem('userName');
        console.log('로그아웃 성공');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userName, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
