import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

const useInitializeMap = (mapboxAccessToken, open) => {
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (!mapboxAccessToken || !open) return;

        mapboxgl.accessToken = mapboxAccessToken;

        const initializeMap = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                map.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/mapbox/light-v11',
                    center: [position.coords.longitude, position.coords.latitude],
                    zoom: 16,
                    language: 'ko-KR',
                    preserveDrawingBuffer: true
                });
                console.log("Map instance created:", map.current);
            }, (error) => {
                console.error("Error getting user's current location:", error);
            });
        };

        if (open) {
            initializeMap();
        }

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [mapboxAccessToken, open]);

    return mapContainer;
};

export default useInitializeMap;
