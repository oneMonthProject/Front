import React, { Suspense } from 'react';
import ProfileCard from '@/components/user/profile/ProfileCard';
import UserHistory from '@/components/user/profile/UserHistory';
import ProfileCardSkeleton from '@/components/user/profile/ProfileCardSkeleton';
import UserHistorySkeleton from '@/components/user/profile/UserHistorySkeleton';

function ProfilePage() {
  return (
    <div>
      <div className='rounded-lg border-2 border-gray-200 bg-white mt-3 mobile:mt-2 px-2'>
        <Suspense fallback={<ProfileCardSkeleton />}>
          <ProfileCard />
        </Suspense>
      </div>
      <div className='p-3 mobile:p-0 mobile:pt-3 space-y-5'>
        <Suspense fallback={<UserHistorySkeleton />}>
          <UserHistory />
        </Suspense>
      </div>
    </div>
  );
}

export default ProfilePage;