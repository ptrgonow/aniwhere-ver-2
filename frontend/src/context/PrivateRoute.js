import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, loading, userId } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (location.pathname === '/' && userId) {
        return <Navigate to={`/user/${userId}`} replace />;
    }

    return children;
};

export default PrivateRoute;
