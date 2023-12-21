import React, { Suspense } from 'react';
import ProfileCard from '@/components/user/profile/ProfileCard';
import UserHistory from '@/components/user/profile/UserHistory';
import { GrScorecard } from "@react-icons/all-files/gr/GrScorecard";

function ProfilePage() {
  return (
    <div>
      <div className='rounded-lg border-2 border-gray-200 bg-white mt-3 mobile:mt-2'>
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileCard />
        </Suspense>
      </div>
      <div className='p-3 mobile:p-0 mobile:pt-3 space-y-5'>
        <div className='flex items-center tablet:text-2xl mobile:text-lg font-semibold text-greyDarkBlue my-8 mobile:my-4'>
          <GrScorecard className='tablet:text-[1.5rem]' />
          <h3 className='ml-2'>사용자 프로젝트 이력</h3>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <UserHistory />
        </Suspense>
      </div>
    </div>
  );
}

export default ProfilePage;