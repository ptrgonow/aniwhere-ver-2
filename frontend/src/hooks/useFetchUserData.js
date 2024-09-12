// frontend/src/hooks/useFetchUserData.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

export const useFetchUserData = (userId) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${API_ENDPOINTS.USER_MAIN.replace(':userId', userId)}`,
                    { withCredentials: true }
                );
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    return { user, loading };
};
