import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

const fetchMarkers = async (routeId) => {
    try {
        const response = await axios.get(
            API_ENDPOINTS.DETAIL_ROUTE.replace(':routeId', routeId));
        console.log("Markers:", response.data.markers)
        return response.data.markers;
    } catch (error) {
        console.error("Error fetching markers:", error);
        return [];
    }
};

export default fetchMarkers;
