import React from "react";
import TrustGradeBadge from "../../ui/TrustGradeBadge";
import PositionBadge from "../../ui/PositionBadge";
import Image from "next/image";

const PostCard = () => {
  return (
    <>
      <div className="p-3 flex-col w-[280px] h-[300px]  rounded-xl border-2 shadow-lg mobile:bg-white mobile:w-full mobile:shadow-none mobile:rounded-none mobile:border-none mobile:mt-3">
        <div className="flex">
          <div className="font-bold text-base mr-3">trustcrews</div>
          <TrustGradeBadge size="xs" text="1등급" color="red" />
        </div>
        <div className="flex mt-2">
          <div className="text-xs">2023.12.05 ~ </div>
          <div className="ml-2 text-xs">2023.01.10</div>
        </div>
        <div className="text-sm mt-2 font-bold text-grey800">
          주제 | 팀프로젝트 매칭 서비스 개발
        </div>
        <div className="text-xl font-bold mt-2">FE, BE 모집합니다</div>
        <div className="flex gap-1 mt-3">
          <PositionBadge size="xs" text="프론트엔드" />
          <PositionBadge size="xs" text="백엔드" />
        </div>
        <div className="flex gap-1 border-b-2 pb-4 mt-5">
          <Image
            src="/images/javascript.svg"
            alt="자바스크립트"
            width={40}
            height={40}
          />
          <Image
            src="/images/typescript.svg"
            alt="타입스크립트"
            width={40}
            height={40}
          />
          <Image src="/images/react.svg" alt="리액트" width={40} height={40} />
        </div>
        <div className="flex items-center mt-2 px-1 justify-between">
          <div>
            <img
              className="inline-block h-9 w-9 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="flex">
            <Image src="/images/views.svg" width={20} height={20} alt="" />
            <div className="ml-2 text-base text-grey800">20</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
