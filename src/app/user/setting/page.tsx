import React from "react";
import ProfileForm from "@/components/user/profile/ProfileForm";

function UserSettingPage() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mobile:mt-4">
      <ProfileForm />
    </div>
  )
}

export default UserSettingPage;