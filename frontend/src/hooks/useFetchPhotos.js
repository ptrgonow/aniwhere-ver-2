import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

const useFetchPhotos = (userId) => {
    const [photos, setPhotos] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPhotos = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        setError(null);

        try {
            console.log(`사용자 ID: ${userId}, 페이지: ${page}, 제한: 9로 사진을 가져 오는 중`);
            const response = await axios.get(
                API_ENDPOINTS.USER_ROUTE.replace(':userId', userId),
                { params: { page, limit: 9, offset: (page - 1) * 9 } }
            );

            const newPhotos = response.data;

            if (newPhotos.length === 0) {
                setHasMore(false);
            } else {
                setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
                setPage(prevPage => prevPage + 1);
            }
        } catch (err) {
            console.error('사진을 가져오는 중 오류 발생:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [userId, page, hasMore, loading]);

    useEffect(() => {
        setPhotos([]);
        setPage(1);
        setHasMore(true);
    }, [userId]);

    useEffect(() => {
        fetchPhotos();
    }, [fetchPhotos]);

    return { routes: photos, hasMore, loading, error, fetchPhotos };
};

export default useFetchPhotos;
