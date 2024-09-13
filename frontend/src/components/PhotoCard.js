import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const PhotoCard = ({ photo }) => {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '90%',
                boxSizing: 'border-box',
            }}
        >
            <CardMedia
                component="img"
                sx={{
                    height: '350px',
                    objectFit: 'cover',
                }}
                image={photo.image}
                alt={photo.description}
            />
            <CardContent
                sx={{
                    flex: 1,
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    {photo.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PhotoCard;
