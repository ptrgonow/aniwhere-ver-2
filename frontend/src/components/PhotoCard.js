import React, { useState } from 'react';
import { Card, CardMedia } from '@mui/material';
import PhotoModal from './PhotoModal';

const PhotoCard = ({ photo, user }) => {
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(photo.comments || []);
    const [likes, setLikes] = useState(photo.likes || 0);

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
                    image={photo.image}
                    alt={photo.description}
                />
            </Card>
            <PhotoModal
                open={open}
                handleClose={handleClose}
                photo={photo}
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
