import React from "react";
import Avatar from "@/components/ui/Avatar";
import { format } from "date-fns";

const testItem = {
  title: "FE, BE 모집합니다",
  imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  nickname: "찐개발자",
  createdDate: new Date("2023-11-17")
}

const TitleSection = () => {
  return (
    <div className="flex-col">
      <div className="text-black100 font-bold text-4xl mt-5 mobile:text-2xl">
        {testItem.title}
      </div>
      <div className="flex gap-3 items-center mt-8 mobile:mt-3 border-b-2 pb-8 mobile:pb-3">
        <div className="flex items-center gap-2">
          <div>
            <Avatar size="h-8 w-8 mobile:h-7 w-7" alt={testItem.nickname} src={testItem.imgSrc} />
          </div>
          <div className="text-lg font-bold mobile:text-base">{testItem.nickname}</div>
        </div>
        <div>|</div>
        <div className="text-lg mobile:text-base">{format(testItem.createdDate, "yyyy.MM.dd")}</div>
      </div>
    </div>
  );
};

export default TitleSection;
