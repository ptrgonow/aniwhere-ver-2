import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function PrivateRoute({ children }) {
    const { isLoggedIn, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
