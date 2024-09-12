import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const savedUserName = localStorage.getItem('userName');
        if (savedUserName) {
            setIsLoggedIn(true);
            setUserName(savedUserName);
        }
    }, []);

    const login = (userName) => {
        setIsLoggedIn(true);
        setUserName(userName);
        localStorage.setItem('userName', userName); // 로그인 정보 저장
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserName('');
        localStorage.removeItem('userName'); // 로그아웃 시 정보 삭제
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
