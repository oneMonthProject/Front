'use client';
import React from "react";
import { useRouter } from 'next/navigation';
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import TechStackBadge from '@/components/ui/badge/TechStackBadge';
import UserProjectInfo from "./UserProjectInfo";
import { useProfileInfo } from "@/hooks/useProfileInfo";

function ProfileCard() {
  const router = useRouter();
  const { data, isLoading, error } = useProfileInfo();

  // Loading 시 Skeleton 추가
  // Error 시 Snackbar 추가
  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  // msw 가 한번 오류 났다가 작동해서 일단은 if 문 한번 감쌌음. 서버 연결 이 후 확인해보기
  if (data?.data) {
    const { nickname, profileImgSrc, trustScore, trustGrade, position, techStacks, intro, projectHistoryTotalCount } = data!.data;

    return (
      <div className="space-y-2 mobile:space-y-1 w-full h-fit text-center my-6 mobile:my-4">
        <Avatar size="md" src={profileImgSrc} alt="빈 프로필" />
        <div className="max-w-[300px] m-auto">
          <p className="text-xl mobile:text-lg">{nickname}</p>
          <p className="text-lg mobile:text-base text-grey700">{position.positionName}</p>
          <p className="text-sm mobile:text-xs text-grey500">{intro}</p>
        </div>
        <div>
          {
            techStacks.length > 0 ? techStacks.map((stack) =>
              <TechStackBadge key={stack.technologyStackId} text={stack.technologyStackName} size='xs' className="mx-0.5 w-[70px] mobile:w-[50px] justify-center" />
            ) : <></>
          }
        </div>
        <UserProjectInfo count={projectHistoryTotalCount} grade={`${trustGrade}등급`} score={trustScore} />
        <div className="pt-3 mobile:pt-2">
          <Button size="md" theme="primary-hollow" onClickHandler={() => router.push("/user/setting")}>프로필 수정</Button>
        </div>
      </div>
    )
  }

  return <></>
}

export default ProfileCard;