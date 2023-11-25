import React from 'react';
import ProfileCard from '@/components/user/profile/ProfileCard';
import UserHistory from '@/components/user/profile/UserHistory';

function ProfilePage() {
  return (
    <div>
      <div className='rounded-lg border-2 border-gray-200 bg-white mt-3 mobile:mt-2'>
        <ProfileCard />
      </div>
      <UserHistory />
    </div>
  );
}

export default ProfilePage;