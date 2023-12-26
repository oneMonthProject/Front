import React from "react";
import Avatar from "@/components/ui/Avatar";
import { PostInfo } from "@/utils/type";

const TitleSection = ({ boardInfo }: { boardInfo: PostInfo}) => {
  const { title, createDate, user } = boardInfo;
  return (
    <div className="flex-col">
      <div className="text-black100 font-bold text-4xl mt-5 mobile:text-2xl">
        {title}
      </div>
      <div className="flex gap-3 items-center mt-8 mobile:mt-3 border-b-2 pb-8 mobile:pb-3">
        <div className="flex items-center gap-2">
          <Avatar size="h-8 w-8 mobile:h-7 w-7" alt={user.nickName} src={user.userProfileImgSrc} />
          <div className="text-lg font-bold mobile:text-base">{user.nickName}</div>
        </div>
        <div>|</div>
        <div className="text-lg mobile:text-base">{createDate}</div>
      </div>
    </div>
  );
};

export default TitleSection;
