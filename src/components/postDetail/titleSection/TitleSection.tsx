import React from "react";
import Avatar from "@/components/ui/Avatar";
import { PostInfo } from "@/utils/type";

const TitleSection = ({ boardInfo }: { boardInfo: PostInfo}) => {
  const { title, createDate, user } = boardInfo;
  return (
    <div className="h-[130px] mobile:h-[100px] flex flex-col justify-center mt-5 mb-5 mobile:mt-0 space-y-6 mobile:space-y-3 border-b-2">
      <div className="text-black100 font-bold text-4xl mobile:text-2xl break-words">
        {title}
      </div>
      <div className="flex gap-3 items-center ">
        <div className="flex items-center gap-2">
          <Avatar size="h-8 w-8 mobile:h-7 mobile:w-7" alt={user.nickName} src={user.userProfileImgSrc} />
          <div className="text-lg mobile:text-base">{user.nickName}</div>
        </div>
        <div>|</div>
        <div className="text-lg mobile:text-base">{createDate}</div>
      </div>
    </div>
  );
};

export default TitleSection;
