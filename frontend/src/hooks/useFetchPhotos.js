import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

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
            console.log(`Fetching photos for userId: ${userId}, page: ${page}, limit: 9`);
            const response = await axios.get(`/route/photos/${userId}`, {
                params: { page, limit: 9, offset: (page - 1) * 9 }
            });

            const newPhotos = response.data;

            if (newPhotos.length === 0) {
                setHasMore(false);
            } else {
                setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
                setPage(prevPage => prevPage + 1);
            }
        } catch (err) {
            console.error('Error fetching photos:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [userId, page, loading, hasMore]);

    useEffect(() => {
        setPhotos([]);
        setPage(1);
        setHasMore(true);
    }, [userId]);

    useEffect(() => {
        fetchPhotos();
    }, [fetchPhotos]);

    return { photos, hasMore, loading, error, fetchPhotos };
};

export default useFetchPhotos;
