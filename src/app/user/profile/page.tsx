'use client';
import React, { Suspense, useEffect, useState } from 'react';
import ProfileCard from '@/components/user/profile/ProfileCard';
import UserHistory from '@/components/user/profile/UserHistory';
import ProfileCardSkeleton from '@/components/user/profile/ProfileCardSkeleton';
import UserHistorySkeleton from '@/components/user/profile/UserHistorySkeleton';

function ProfilePage() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted ? (
      <>
        <Suspense fallback={<ProfileCardSkeleton />}>
          <ProfileCard />
        </Suspense >
        <Suspense fallback={<UserHistorySkeleton />}>
          <UserHistory />
        </Suspense>
      </ >
    ) : (
      <>
        <ProfileCardSkeleton />
        <UserHistorySkeleton />
      </ >
    )
  );
}

export default ProfilePage;