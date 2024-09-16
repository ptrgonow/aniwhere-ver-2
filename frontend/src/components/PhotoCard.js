import React, { useState } from 'react';
import { Card, CardMedia } from '@mui/material';
import MapModal from './MapModal';

const PhotoCard = ({ route, user }) => {
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(route.comments || []);
    const [likes, setLikes] = useState(route.likes || 0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCommentChange = (e) => setComment(e.target.value);
    const handleCommentSubmit = () => {
        if (comment.trim()) {
            setComments([...comments, { user: user.userId, text: comment }]);
            setComment('');
        }
    };
    const handleLike = () => setLikes(likes + 1);

    return (
        <>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    cursor: 'pointer',
                }}
                onClick={handleOpen}
            >
                <CardMedia
                    component="img"
                    sx={{
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    image={route.image}
                    alt={route.description}
                />
            </Card>
            <MapModal
                open={open}
                handleClose={handleClose}
                route={route}
                user={user}
                comment={comment}
                comments={comments}
                likes={likes}
                handleCommentChange={handleCommentChange}
                handleCommentSubmit={handleCommentSubmit}
                handleLike={handleLike}
            />
        </>
    );
};

export default PhotoCard;
