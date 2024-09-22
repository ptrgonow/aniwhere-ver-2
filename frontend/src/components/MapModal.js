import React, { useEffect } from 'react';
import { Avatar, Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import { ChatBubbleOutline, Favorite, Send } from '@mui/icons-material';
import { styled } from '@mui/system';
import 'mapbox-gl/dist/mapbox-gl.css';
import useMapWithMarkers from '../hooks/useMapWithMarkers';
import useMapboxAccessToken from '../hooks/useMapboxAccessToken';

const StyledModal = styled(Modal)(() => ({
    '& .MuiBackdrop-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    '& .MuiBox-root': {
        '&:focus': {
            outline: 'none',
        },
    },
}));

const MapModal = ({ open, handleClose, route, user, comment, comments, likes, handleCommentChange, handleCommentSubmit, handleLike }) => {
    const mapboxAccessToken = useMapboxAccessToken();
    const { mapContainer, markers, addMarker, loadMarkers } = useMapWithMarkers(mapboxAccessToken, open, user.id);

    useEffect(() => {
        if (open) {
            console.log("모달이 열렸습니다.");
            loadMarkers(route.id);
        }
    }, [open, route.id, loadMarkers]);

    return (
        <StyledModal
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
                    border: 'none',
                    borderRadius: '4px',
                    overflow: 'hidden',
                }}
                tabIndex={-1}
            >
                <Box sx={{ width: '60%', height: '100%' }}>
                    <div ref={mapContainer} style={{ width: '100%', height: '100%' }}></div>
                </Box>

                <Box sx={{ width: '40%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Header */}
                    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
                        <Avatar src={user.userImage} alt={user.userId} />
                        <Typography variant="subtitle1" sx={{ ml: 1 }}>{user.userId}</Typography>
                    </Box>

                    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                        <Typography variant="body1">{route.description}</Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                        {comments.map((cmt, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">{cmt.userId}</Typography>
                                <Typography variant="body1">{cmt.text}</Typography>
                            </Box>
                        ))}
                    </Box>

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
                            {new Date().toLocaleDateString()}
                        </Typography>
                    </Box>

                    <Box sx={{ p: 2, display: 'flex', borderTop: 1, borderColor: 'divider' }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="댓글을 입력하세요..."
                            value={comment}
                            onChange={handleCommentChange}
                        />
                        <Button onClick={handleCommentSubmit}>게시</Button>
                    </Box>
                </Box>
            </Box>
        </StyledModal>
    );
};

export default MapModal;
