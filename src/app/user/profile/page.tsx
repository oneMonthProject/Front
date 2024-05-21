import React from 'react';
import ProfileCard from '@/components/user/profile/ProfileCard';
import UserHistory from '@/components/user/profile/UserHistory';

function ProfilePage() {
    return (
        <>
            <ProfileCard/>
            <UserHistory/>
        </ >
    );
}

export default ProfilePage;