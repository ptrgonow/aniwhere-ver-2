import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, CircularProgress, Typography } from '@mui/material';
import PhotoCard from './PhotoCard';
import useFetchPhotos from '../hooks/useFetchPhotos';
import './AlbumSection.css';
import basicProfileImage from '../assets/basic_profile.png';

const AlbumSection = ({ userId, isOwnProfile }) => {
    const { photos, hasMore, error, loadMorePhotos } = useFetchPhotos(userId);

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <div id="scrollableDiv" className="albumSection">
            <InfiniteScroll
                dataLength={photos.length}
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
                    {photos.map(photo => (
                        <Box
                            key={photo.id}
                            sx={{
                                aspectRatio: '1/1',
                                overflow: 'hidden',
                            }}
                        >
                            <PhotoCard
                                photo={photo}
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
