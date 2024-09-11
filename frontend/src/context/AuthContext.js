import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({
    userName: '',
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (name) => {
        setUserName(name);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setUserName('');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ userName, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
