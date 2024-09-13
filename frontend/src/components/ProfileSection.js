import React from 'react';
import { useParams } from 'react-router-dom';
import './ProfileSection.css';
import { useFetchUserData } from '../hooks/useFetchUserData';

function ProfileSection() {
    const { userId } = useParams();
    const { user, loading } = useFetchUserData(userId);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="profile">
            <div className="profile-container">
                <div className="profile-image">
                    <img src="/basic_profile.png" alt="profile" />
                </div>
                <div className="profile-content">
                    <div className="profile-name">
                        <h1>{user?.userId}</h1>
                    </div>
                    <div className="profile-description">
                        <p>{user?.userName}</p>
                    </div>
                    <div className="profile-function">
                        <ul className="profile-ul">
                            <li>루트 </li>
                            <li>팔로우 </li>
                            <li>팔로워 </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfileSection;
