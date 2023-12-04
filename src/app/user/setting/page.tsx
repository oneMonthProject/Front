import React from "react";
import ProfileForm from "@/components/user/profile/ProfileForm";

function UserSettingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <ProfileForm />
    </div>
  )
}

export default UserSettingPage;