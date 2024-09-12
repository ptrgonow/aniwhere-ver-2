// frontend/src/pages/Home.js
import React from 'react';
import ProfileSection from '../components/ProfileSection';
import AlbumSection from '../components/AlbumSection';

function Home() {
    return (
        <div className="home">
            <ProfileSection />
            <AlbumSection />
        </div>
    );
}

export default Home;
