import React, { useState } from 'react';
import { Card, CardMedia, Modal, Box, Typography, TextField, Button, Avatar, IconButton } from '@mui/material';
import { Favorite, ChatBubbleOutline, Send } from '@mui/icons-material';

const PhotoCard = ({ photo, user, isOwnProfile }) => {
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        maxWidth: '1000px',
                        height: '80%',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        display: 'flex',
                    }}
                >
                    {/* Left side - Image */}
                    <Box sx={{ width: '60%', height: '100%' }}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                            image={photo.image}
                            alt={photo.description}
                        />
                    </Box>

                    {/* Right side - Comments and Interactions */}
                    <Box sx={{ width: '40%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        {/* Header */}
                        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
                            <Avatar src={user.userImage} alt={user.userId} />
                            <Typography variant="subtitle1" sx={{ ml: 1 }}>{user.userId}</Typography>
                        </Box>

                        {/* Description */}
                        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                            <Typography variant="body1">{photo.description}</Typography>
                        </Box>

                        {/* Comments */}
                        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                            {comments.map((cmt, index) => (
                                <Box key={index} sx={{ mb: 1 }}>
                                    <Typography variant="subtitle2" component="span" fontWeight="bold">
                                        {cmt.user}
                                    </Typography>
                                    <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                        {cmt.text}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        {/* Interactions */}
                        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                            <Box sx={{ display: 'flex', mb: 1 }}>
                                <IconButton onClick={handleLike}>
                                    <Favorite />
                                </IconButton>
                                <IconButton>
                                    <ChatBubbleOutline />
                                </IconButton>
                                <IconButton>
                                    <Send />
                                </IconButton>
                            </Box>
                            <Typography variant="body2" fontWeight="bold">{likes} likes</Typography>
                            <Typography variant="caption" color="text.secondary">
                                {new Date(photo.date).toLocaleDateString()}
                            </Typography>
                        </Box>

                        {/* Comment Input */}
                        <Box sx={{ p: 2, display: 'flex', borderTop: 1, borderColor: 'divider' }}>
                            <TextField
                                fullWidth
                                variant="standard"
                                placeholder="댓글 추가..."
                                value={comment}
                                onChange={handleCommentChange}
                            />
                            <Button onClick={handleCommentSubmit}>게시</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default PhotoCard;
