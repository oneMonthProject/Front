'use client';
import React, { Suspense, useEffect, useState } from "react";
import ProfileForm from "@/components/user/profile/ProfileForm";
import ProfileFormSkeleton from "@/components/user/profile/ProfileFormSkeleton";
import useClientMount from "@/hooks/useClientMount";

function UserSettingPage() {
  const mounted = useClientMount();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      {
        mounted ? (
          <Suspense fallback={<ProfileFormSkeleton />}>
            <ProfileForm />
          </Suspense>
        ) : <ProfileFormSkeleton />
      }
    </div>
  )
}

export default UserSettingPage;