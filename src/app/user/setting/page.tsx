import React, { Suspense } from "react";
import ProfileForm from "@/components/user/profile/ProfileForm";
import ProfileFormSkeleton from "@/components/user/profile/ProfileFormSkeleton";

function UserSettingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <Suspense fallback={<ProfileFormSkeleton />}>
        <ProfileForm />
      </Suspense>
    </div>
  )
}

export default UserSettingPage;