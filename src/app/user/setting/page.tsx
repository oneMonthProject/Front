'use client';
import React, { Suspense, useEffect, useState } from "react";
import ProfileForm from "@/components/user/profile/ProfileForm";
import ProfileFormSkeleton from "@/components/user/profile/ProfileFormSkeleton";

function UserSettingPage() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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