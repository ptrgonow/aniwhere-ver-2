import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import userMarkerIcon from '../assets/Icon.png';
import serverMarkerIcon from '../assets/fIcon.png';
import { API_ENDPOINTS } from '../config/apiConfig';

const useMapWithMarkers = (mapboxAccessToken, open, userId) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [markers, setMarkers] = useState([]);
    const [lines, setLines] = useState([]);
    const [markerId, setMarkerId] = useState(0);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [routeLoaded, setRouteLoaded] = useState(false);

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

                // 현재 위치에 마커 추가
                new mapboxgl.Marker({
                    element: createMarkerElement(userMarkerIcon)
                })
                .setLngLat([position.coords.longitude, position.coords.latitude])
                .addTo(map.current);

                map.current.on('load', () => {
                    setMapLoaded(true);
                    console.log("맵 인스턴스 생성 완료:", map.current);
                });
            }, (error) => {
                console.error("사용자의 현재 위치를 가져오는 중 오류 발생:", error);
            });
        };

        if (open) {
            initializeMap();
        }

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
                setMapLoaded(false);
                setRouteLoaded(false);
            }
        };
    }, [mapboxAccessToken, open]);

    const createMarkerElement = (icon) => {
        const el = document.createElement('div');
        el.style.backgroundImage = `url(${icon})`;
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.backgroundSize = '100%';
        return el;
    };

    const addMarker = (longitude, latitude) => {
        if (!map.current) {
            console.error('맵 객체가 초기화되지 않았습니다');
            return;
        }

        console.log('마커 추가 중:', { longitude, latitude });
        const markerIdStr = 'marker' + markerId;
        setMarkerId(markerId + 1);

        const marker = new mapboxgl.Marker({ element: createMarkerElement(serverMarkerIcon), draggable: true })
            .setLngLat([longitude, latitude])
            .addTo(map.current);

        const newMarkers = [...markers, { id: markerIdStr, marker, coordinates: [longitude, latitude] }];
        setMarkers(newMarkers);
        updateLines(newMarkers);

        marker.on('drag', () => {
            const lngLat = marker.getLngLat();
            console.log('마커 드래그 중:', lngLat);
            const updatedMarkers = markers.map(m => m.id === markerIdStr ? { ...m, coordinates: [lngLat.lng, lngLat.lat] } : m);
            setMarkers(updatedMarkers);
            updateLines(updatedMarkers);
        });
    };

    const updateLines = (updatedMarkers) => {
        console.log('라인 업데이트 중:', updatedMarkers);
        const newLines = [];
        for (let i = 0; i < updatedMarkers.length - 1; i++) {
            const coordinates = [updatedMarkers[i].coordinates, updatedMarkers[i + 1].coordinates];
            const lineIdStr = 'line' + i;
            drawLine(coordinates, lineIdStr, '#FFB3BA');
            newLines.push(lineIdStr);
        }
        setLines(newLines);
    };

    const drawLine = (coordinates, lineId, color) => {
        if (!map.current) {
            console.error('맵 객체가 초기화되지 않았습니다');
            return;
        }

        console.log('라인 그리기 중:', { coordinates, lineId, color });
        if (map.current.getSource(lineId)) {
            map.current.getSource(lineId).setData({
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': coordinates
                }
            });
        } else {
            map.current.addSource(lineId, {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': coordinates
                    }
                }
            });

            map.current.addLayer({
                'id': lineId + '-outline',
                'type': 'line',
                'source': lineId,
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': 'rgba(0,0,0,0.99)',
                    'line-width': 6
                }
            });

            map.current.addLayer({
                'id': lineId,
                'type': 'line',
                'source': lineId,
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': color,
                    'line-width': 4
                }
            });
        }
    };

    const loadMarkers = async (routeId) => {
        if (!mapLoaded || routeLoaded) {
            console.error('맵 객체가 초기화되지 않았거나 루트가 이미 로드되었습니다');
            return;
        }

        try {
            console.log('마커 로드 중:', routeId);
            const response = await axios.get(API_ENDPOINTS.DETAIL_ROUTE.replace(':routeId', routeId));
            const loadedMarkers = response.data.markers.map((marker, index) => ({
                id: 'marker' + index,
                marker: new mapboxgl.Marker({ element: createMarkerElement(serverMarkerIcon) })
                    .setLngLat([marker.longitude, marker.latitude])
                    .addTo(map.current),
                coordinates: [marker.longitude, marker.latitude]
            }));
            setMarkers(loadedMarkers);
            updateLines(loadedMarkers);

            // 루트의 첫 번째 마커로 지도의 포커스를 이동
            if (loadedMarkers.length > 0) {
                const firstMarker = loadedMarkers[0].coordinates;
                map.current.flyTo({ center: firstMarker, zoom: 16 });
            }

            setRouteLoaded(true);
        } catch (error) {
            console.error("마커 로드 중 오류 발생:", error);
        }
    };

    return { mapContainer, markers, addMarker, loadMarkers };
};

export default useMapWithMarkers;
