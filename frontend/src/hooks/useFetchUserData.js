import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

export const useFetchUserData = (userId) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${API_ENDPOINTS.USER_MAIN.replace(':userId', userId)}`,
                { withCredentials: true });
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    return { user, loading, refetch: fetchUserData };
};
