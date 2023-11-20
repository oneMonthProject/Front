import PositionBadge from "@/components/ui/PositionBadge";
import TrustGradeBadge from "@/components/ui/TrustGradeBadge";
import React from "react";
import Image from "next/image";

const InfoSection = () => {
  return (
    <div className="py-14 px-4 grid gap-x-1 grid-cols-2 text-xl font-bold gap-y-6 auto-rows-auto mobile:text-xs mobile:grid-cols-1 mobile:gap-y-0 mobile:py-7">
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800">모임 이름</span>
        <span>trustcrew</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800">모임 등급</span>
        <div>
          <TrustGradeBadge size="sm" text="1등급" color="red" />
        </div>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 whitespace-nowrap">모임 주제</span>
        <span className="truncate">팀프로젝트 매칭 서비스 개발</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800">시작 예정</span>
        <span>2023.12.05</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800">모임 구분</span>
        <span>프로젝트</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800">종료 예정</span>
        <span>2024.01.05</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800">모집 인원</span>
        <span>5명</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 whitespace-nowrap">사용 언어</span>
        <div className="flex gap-1 items-center">
          <div className="w-10 h-10 mobile:w-8 mobile:h-8">
            <Image
              src="/images/javascript.svg"
              alt="자바스크립트"
              width={40}
              height={40}
              layout="responsive"
            />
          </div>
          <div className="w-10 h-10 mobile:w-8 mobile:h-8">
            <Image
              src="/images/typescript.svg"
              alt="타입스크립트"
              width={40}
              height={40}
            />
          </div>
          <div className="w-10 h-10 mobile:w-8 mobile:h-8">
            <Image
              src="/images/react.svg"
              alt="리액트"
              width={40}
              height={40}
            />
          </div>
          <div className="w-10 h-10 mobile:w-8 mobile:h-8">
            <Image src="/images/java.svg" alt="자바" width={40} height={40} />
          </div>
          <div className="w-10 h-10 mobile:w-8 mobile:h-8">
            <Image
              src="/images/spring.svg"
              alt="스프링"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800">모집 분야</span>
        <div className="flex gap-1 items-center">
          <PositionBadge size="xs" text="프론트엔드" />
          <PositionBadge size="xs" text="백엔드" />
        </div>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 whitespace-nowrap">연락 수단</span>
        <span>오픈채팅 / 이메일 / 연락처</span>
      </div>
    </div>
  );
};

export default InfoSection;
