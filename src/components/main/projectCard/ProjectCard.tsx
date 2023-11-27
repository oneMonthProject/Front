import React from "react";
import TrustGradeBadge from "../../ui/badge/TrustGradeBadge";
import Image from "next/image";

const ProjectCard = () => {
  return (
    <div>
      <div className="p-3 flex-col w-[280px] h-[260px]  rounded-xl border-2 shadow-lg mobile:bg-white mobile:w-full mobile:shadow-none mobile:rounded-none mobile:border-none mobile:mt-3">
        <div className="flex">
          <div className="font-bold text-base mr-3">trustcrews</div>
          <TrustGradeBadge size="xs" text="1등급" color="red" />
        </div>
        <div className="flex mt-1">
          <div className="text-xs">2023.12.05 ~ </div>
          <div className="ml-2 text-xs">2023.01.10</div>
        </div>
        <div className="text-xl font-bold mt-3 w-11/12">
          팀 프로젝트 매칭 서비스 개발
        </div>

        <div className="flex -space-x-3 overflow-hidden mt-5">
          <Image
            className="inline-block rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            width={10}
            height={10}
            alt=""
          />
          <Image
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            width={10}
            height={10}
          />
          <Image
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
            alt=""
            width={10}
            height={10}
          />
          <Image
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            width={10}
            height={10}
          />
        </div>
        <div className="flex mt-7">
          <Image src="/images/update.svg" alt="" width={25} height={25} />
          <div className="font-bold text-grey800 ml-2">업데이트</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
