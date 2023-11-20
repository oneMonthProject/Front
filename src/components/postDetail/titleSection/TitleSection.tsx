import React from "react";
import Image from "next/image";
import BackIcon from "../../../../public/images/pageback.svg";

const TitleSection = () => {
  return (
    <div className="flex-col">
      <Image src={BackIcon} alt="" className="w-8 h-8" />
      <div className="text-black100 font-bold text-4xl mt-5 mobile:text-3xl mobile:text-center">
        FE, BE 모집합니다
      </div>
      <div className="flex gap-3 items-center mt-8 border-b-2 pb-10 mobile:justify-center mobile:pb-6">
        <div className="flex items-center gap-2">
          <div>
            <img
              className="inline-block h-8 w-8 rounded-full mobile:h-7 mobile:w-7"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="text-lg font-bold mobile:text-base">찐개발자</div>
        </div>
        <div>|</div>
        <div className="text-lg mobile:text-base">2023.11.17</div>
      </div>
    </div>
  );
};

export default TitleSection;
