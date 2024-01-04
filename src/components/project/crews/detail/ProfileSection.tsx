'use client';
import React from 'react';
import Avatar from "@/components/ui/Avatar";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import ProjectRoleBadge from "@/components/ui/badge/ProjectRoleBadge";
import Button from "@/components/ui/Button";
import {useQueryString} from "@/hooks/useQueryString";
import {useSuspenseQuery} from "@tanstack/react-query";


function ProfileSection() {
    const projectMemberId = useQueryString('projectMemberId');
// const {data:projectMemberInfo} = useSuspenseQuery<ResponeBody<>>

    return (
        <div className="flex mobile:flex-col mobile:space-y-6 mobile:mt-4 px-1 py-4 mx-auto items-center justify-center">
            {/*<section className='mobile:w-full pc:w-[200px] tablet:w-[150px] tablet:mr-10 flex flex-col items-center'>*/}
            {/*    <Avatar size="md" src={testUserInfo.imageSrc} alt="빈 프로필"/>*/}
            {/*    <ul className="my-3 flex flex-col items-center">*/}
            {/*        <li className="pc:text-2xl tablet:text-[1.3rem] mobile:text-lg font-medium text-greyDarkBlue">{testUserInfo.nickname}</li>*/}
            {/*    </ul>*/}
            {/*    <Button theme='black' size='md'>프로젝트 탈퇴</Button>*/}
            {/*</section>*/}
            {/*<section className='mobile:w-full tablet:h-[200px] mobile:h-[180px] flex flex-col flex-wrap justify-between p-6 mobile:p-4 bg-ground100 rounded-lg'>*/}
            {/*    <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>*/}
            {/*        <span className='tablet:w-[200px] tablet:text-[1.2rem] font-medium text-geryDarkBlue'>프로젝트 권한</span>*/}
            {/*        <span className='min-w-[100px] flex justify-center grow-0 mx-auto'>*/}
            {/*            <ProjectRoleBadge text={testUserInfo.projectRole} size='sm'/>*/}
            {/*        </span>*/}
            {/*    </div>*/}
            {/*    <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>*/}
            {/*        <span className='tablet:w-[200px] tablet:text-[1.2rem] font-medium text-geryDarkBlue'>프로젝트 포지션</span>*/}
            {/*        <span className='min-w-[100px] flex justify-center grow-0 mx-auto'>*/}
            {/*            <PositionBadge text={testUserInfo.projectPosition.name} size='sm'/>*/}
            {/*        </span>*/}
            {/*    </div>*/}
            {/*    <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>*/}
            {/*        <span className='tablet:w-[200px] tablet:text-[1.2rem] font-medium text-geryDarkBlue'>프로젝트 합류일</span>*/}
            {/*        <span className='min-w-[100px] flex justify-center grow-0 mx-auto text-center tablet:text-lg font-medium text-greyBlue'>2023-10-15</span>*/}
            {/*    </div>*/}
            {/*    <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>*/}
            {/*        <span className='tablet:w-[200px] tablet:text-[1.2rem] font-medium text-geryDarkBlue'>신뢰점수 획득률</span>*/}
            {/*        <span className='min-w-[100px] flex justify-center grow-0 mx-auto text-center tablet:text-lg font-medium text-greyBlue'>80%</span>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </div>
    );
}

export default ProfileSection;