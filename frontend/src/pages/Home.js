import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileSection from '../components/ProfileSection';
import AlbumSection from '../components/AlbumSection';
import { useFetchUserData } from '../hooks/useFetchUserData';
import writeImage from '../assets/write.png';
import './Home.css';

const Home = React.memo(() => {
    const { userId } = useParams();
    const { user } = useAuth();
    const { user: pageUser, loading } = useFetchUserData(userId || user.id);
    const loggedInUserId = localStorage.getItem('userId');

    console.log(`Home 컴포넌트 렌더링: userId=${userId}, pageUser=${pageUser?.id}`);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (!pageUser) {
        return <div>사용자를 찾을 수 없습니다.</div>;
    }

    const isOwnProfile = pageUser.id === user.id;

    return (
        <div className="home">
            <ProfileSection user={pageUser} loggedInUserId={loggedInUserId}/>
            <AlbumSection userId={pageUser.userId} isOwnProfile={isOwnProfile}/>
        </div>
    );
});

export default Home;
