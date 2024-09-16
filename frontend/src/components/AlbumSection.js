import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, CircularProgress, Typography } from '@mui/material';
import PhotoCard from './PhotoCard';
import useFetchPhotos from '../hooks/useFetchPhotos';
import './AlbumSection.css';
import basicProfileImage from '../assets/basic_profile.png';

const AlbumSection = ({ userId, isOwnProfile }) => {
    const { routes, hasMore, error, loadMorePhotos } = useFetchPhotos(userId);

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <div id="scrollableDiv" className="albumSection">
            <InfiniteScroll
                dataLength={routes.length}
                next={loadMorePhotos}
                hasMore={hasMore}
                loader={<CircularProgress color="primary" />}
                scrollableTarget="scrollableDiv"
            >
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    gap={2}
                    sx={{ p: 2 }}
                >
                    {routes.map(route => (
                        <Box
                            key={route.id}
                            sx={{
                                aspectRatio: '1/1',
                                overflow: 'hidden',
                            }}
                        >
                            <PhotoCard
                                route={route}
                                user={{
                                    userId: userId,
                                    userImage: basicProfileImage
                                }}
                                isOwnProfile={isOwnProfile}
                            />
                        </Box>
                    ))}
                </Box>
            </InfiniteScroll>
        </div>
    );
};

export default AlbumSection;
