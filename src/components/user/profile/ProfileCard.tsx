'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import TechStackBadge from '@/components/user/TechStackBadge';
import UserProjectInfo from "./UserProjectInfo";
import { SelectItem } from "@/utils/type";

const positionList = [
  { value: 1, name: '프론트엔드' },
  { value: 2, name: '백엔드' },
  { value: 3, name: '디자이너' },
  { value: 4, name: 'IOS' },
  { value: 5, name: '안드로이드' },
  { value: 6, name: '데브옵스' }
];

const techStackList = [
  { value: 1, name: 'React' },
  { value: 2, name: 'TypeScript' },
  { value: 3, name: 'JavaScript' },
  { value: 4, name: 'Vue' },
  { value: 5, name: 'Nextjs' },
  { value: 6, name: 'Node.js' },
  { value: 7, name: 'Java' },
  { value: 8, name: 'Spring' },
  { value: 9, name: 'Kotlin' },
  { value: 10, name: 'Nestjs' },
  { value: 11, name: 'Swift' },
  { value: 12, name: 'Flutter' },
  { value: 13, name: 'Figma' },
];

interface UserInfo {
  imageSrc: string | null;
  nickname: string;
  position: SelectItem | null;
  techStack: SelectItem[];
  selfIntroduction: string;
}

const testUserInfo: UserInfo = {
  imageSrc: null,
  nickname: "Robert Whistable",
  position: positionList[0],
  techStack: [techStackList[0], techStackList[1], techStackList[5], techStackList[8], techStackList[9]],
  selfIntroduction: "개발 N년차 웹 프론트엔드 개발자 입니다."
};

function ProfileCard() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(testUserInfo);
  const [projectInfo, setProjectInfo] = useState({ count: 3, trustGrade: 1, trustScore: 1200 });

  return (
    <div className="space-y-2 mobile:space-y-1 w-full h-fit text-center my-6 mobile:my-4">
      {
        userInfo ? (
          <>
            <Avatar size="md" src={userInfo.imageSrc} alt="빈 프로필" />
            <div className="max-w-[300px] m-auto">
              <p className="text-xl mobile:text-lg">{userInfo.nickname}</p>
              <p className="text-lg mobile:text-base text-grey700">{userInfo.position?.name}</p>
              <p className="text-sm mobile:text-xs text-grey500">{userInfo.selfIntroduction}</p>
            </div>
            <div>
              {
                userInfo.techStack.length > 0 ? userInfo.techStack.map((stack) =>
                  <TechStackBadge key={stack.value} text={stack.name} size='xs' className="mx-0.5 w-[70px] mobile:w-[50px] justify-center" />
                ) : <></>
              }
            </div>
          </>
        ) : <></>
      }
      <UserProjectInfo count={projectInfo.count} grade={projectInfo.trustGrade} score={projectInfo.trustScore} />
      <div className="pt-3 mobile:pt-2">
        <Button size="md" theme="primary-hollow" onClickHandler={() => router.push("/user/setting")}>프로필 수정</Button>
      </div>
    </div>
  )
}

export default ProfileCard;