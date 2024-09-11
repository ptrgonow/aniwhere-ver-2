import React from 'react';
import { Link } from "react-router-dom";
import { apiBaseUrl, API_ENDPOINTS } from '../config/apiConfig';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header() {
    const { isLoggedIn, userName, logout } = useAuth();

    const handleLogout = () => {
        axios.post(
            `${apiBaseUrl}${API_ENDPOINTS.USER_LOGOUT}`,
            {},
            { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    logout();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <header className="header">
            <nav>
                <ul className="top-nav">
                    {isLoggedIn ? (
                        <>
                            <li><Link to="/">홈</Link></li>
                            <li>{userName}님</li>
                            <li>
                                <button onClick={handleLogout}>로그아웃</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/">홈</Link></li>
                            <li><Link to="login">로그인</Link></li>
                            <li><Link to="register">회원가입</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
