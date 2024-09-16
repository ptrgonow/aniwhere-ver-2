import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './ProfileSection.css';
import { useFetchUserData } from '../hooks/useFetchUserData';
import useFetchPhotos from "../hooks/useFetchPhotos";
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';
import basicProfileImage from '../assets/basic_profile.png';

const ProfileSection = React.memo(({ loggedInUserId }) => {
    const { userId } = useParams();
    const { user, loading, refetch } = useFetchUserData(userId);
    const { routes, loading: photosLoading } = useFetchPhotos(userId);
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState('');
    const [error, setError] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (user) {
            setBio(user.bio || '');
        }
    }, [user]);

    const handleEditClick = useCallback(() => {
        setIsEditing(true);
    }, []);

    const handleBioChange = useCallback((e) => {
        const newBio = e.target.value;
        setBio(newBio);
        if (newBio.length > 20) {
            setError('자기소개는 20자 이내로 작성해주세요.');
        } else {
            setError('');
        }
    }, []);

    const handleSaveClick = useCallback(async () => {
        if (bio.length > 20) {
            setError('자기소개는 20자 이내로 작성해주세요.');
            return;
        }
        try {
            const response = await axios.put(
                `${API_ENDPOINTS.USER_BIO.replace(':userId', userId)}`,
                { bio },
                { withCredentials: true }
            );
            setBio(response.data.bio);
            setIsEditing(false);
            setError('');
            await refetch();
        } catch (error) {
            console.error('Error saving bio:', error);
        }
    }, [bio, userId, refetch]);

    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);

    const profileImageSrc = user?.profileImage || basicProfileImage;

    if (loading || photosLoading) {
        return <div className="profile profile-loading">Loading...</div>;
    }

    return (
        <div className={`profile ${imageLoaded ? 'image-loaded' : ''}`}>
            <div className="profile-container">
                <div className="profile-image">
                    <img
                        src={profileImageSrc}
                        alt="Profile"
                        onLoad={handleImageLoad}
                        onError={handleImageLoad}
                    />
                </div>
                <div className="profile-content">
                    <h2>{user?.userId}</h2>
                    <div className="bio-section">
                        {isEditing ? (
                            <div className="bio-edit">
                                <input
                                    type="text"
                                    value={bio}
                                    onChange={handleBioChange}
                                    maxLength="20"
                                />
                                <button onClick={handleSaveClick}>✔️</button>
                            </div>
                        ) : (
                            <div className="bio-display">
                                <p>{bio || '자기소개를 입력해주세요.'}</p>
                                {loggedInUserId === user?.userId && (
                                    <button onClick={handleEditClick}>✏️</button>
                                )}
                            </div>
                        )}
                        {error && <p className="error">{error}</p>}
                    </div>
                    <ul className="profile-ul">
                        <li>루트 {routes?.length || 0}</li>
                        <li>팔로우 {user?.followCount || 0}</li>
                        <li>팔로워 {user?.followerCount || 0}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
});

export default ProfileSection;
