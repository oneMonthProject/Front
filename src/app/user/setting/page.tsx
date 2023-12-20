import React, { Suspense } from "react";
import ProfileForm from "@/components/user/profile/ProfileForm";

function UserSettingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileForm />
      </Suspense>
    </div>
  )
}

export default UserSettingPage;