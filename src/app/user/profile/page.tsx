import React from 'react';
import ProfileCard from '@/components/user/profile/ProfileCard';
import UserHistory from '@/components/user/profile/UserHistory';

function ProfilePage() {
  return (
    <div>
      <div className='rounded-lg border-2 border-gray-200 bg-white mt-3 mobile:mt-2'>
        <ProfileCard />
      </div>
      <div className='p-3 mobile:p-0 mobile:pt-3 mt-2 space-y-5'>
        <span>사용자 프로젝트 이력</span>
        <UserHistory />
      </div>
    </div>
  );
}

export default ProfilePage;