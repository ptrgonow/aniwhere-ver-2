import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, CircularProgress, Typography } from '@mui/material';
import PhotoCard from './PhotoCard';
import useFetchPhotos from '../hooks/useFetchPhotos';
import './AlbumSection.css';

const AlbumSection = ({ userId }) => {
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
                endMessage={
                    (() => {
                        console.log("모든 사진을 불러왔습니다.");
                        return null;
                    })()
                }
            >
                <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    gap={2}
                >
                    {photos.map(photo => (
                        <Box
                            key={photo.id}
                            sx={{
                                flexBasis: 'calc(25% - 16px)',
                                maxWidth: 'calc(25% - 16px)',
                                minHeight: '450px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <PhotoCard
                                photo={photo}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </InfiniteScroll>
        </div>
    );
};

export default AlbumSection;
