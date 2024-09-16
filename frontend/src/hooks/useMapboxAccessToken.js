import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

const useMapboxAccessToken = () => {
    const [mapboxAccessToken, setMapboxAccessToken] = useState('');

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.GET_MAPBOX_ACCESS_TOKEN);
                setMapboxAccessToken(response.data.token);
            } catch (error) {
                console.error("Error getting Mapbox access token:", error);
            }
        };

        fetchAccessToken();
    }, []);

    return mapboxAccessToken;
};

export default useMapboxAccessToken;
