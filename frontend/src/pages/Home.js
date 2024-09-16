import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileSection from '../components/ProfileSection';
import AlbumSection from '../components/AlbumSection';
import { useFetchUserData } from '../hooks/useFetchUserData';
import './Home.css';

function Home() {
    const { userId } = useParams();
    const { user } = useAuth();
    const { user: pageUser, loading } = useFetchUserData(userId || user.id);
    const loggedInUserId = localStorage.getItem('userId');

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!pageUser) {
        return <div>사용자를 찾을 수 없습니다.</div>;
    }

    const isOwnProfile = pageUser.id === user.id;

    return (
        <div className="home">
            <ProfileSection user={pageUser} loggedInUserId={loggedInUserId} />
            <AlbumSection userId={pageUser.userId} isOwnProfile={isOwnProfile} />
        </div>
    );
}

export default Home;
