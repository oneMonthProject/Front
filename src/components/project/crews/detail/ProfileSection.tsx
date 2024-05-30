'use client';
import React from 'react';
import Avatar from "@/components/ui/Avatar";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import ProjectRoleBadge from "@/components/ui/badge/ProjectRoleBadge";
import {useQueryString} from "@/hooks/useQueryString";
import {useQuery} from "@tanstack/react-query";
import {ProjectMemberProfile, ResponseBody} from "@/utils/type";
import {getCrewDetail} from "@/service/project/crews";
import CrewStatusBadge from "@/components/ui/badge/CrewStatusBadge";
import CrewOutButton from "@/components/project/crews/detail/CrewOutButton";
import ProfileSectionSkeleton from "@/components/ui/skeleton/project/crews/detail/ProfileSectionSkeleton";


function ProfileSection({projectMemberId}:{projectMemberId:string}) {
    const {data, isFetching} = useQuery<ResponseBody<ProjectMemberProfile>, Error>({
        queryKey: ['crewDetail', projectMemberId],
        queryFn: () => getCrewDetail(projectMemberId)
    });

    if(isFetching) return <ProfileSectionSkeleton/>;

    const {user, position, status, projectMemberAuth} = data!.data;

    return (
        <div
            className="flex mobile:flex-col mobile:space-y-6 mobile:mt-4 px-1 py-4 mx-auto items-center justify-center">
            <section className='mobile:w-full pc:w-[200px] tablet:w-[150px] tablet:mr-10 flex flex-col items-center'>
                <Avatar size="md" src={user.profileImgSrc} alt="빈 프로필"/>
                <ul className="my-3 flex flex-col items-center">
                    <li className="pc:text-2xl tablet:text-[1.3rem] mobile:text-lg font-medium text-greyDarkBlue">
                        {user.nickname}
                    </li>
                </ul>
                <CrewOutButton projectMemberInfo={data!.data}/>
            </section>
            <section
                className='mobile:w-full tablet:h-[200px] mobile:h-[180px] flex flex-col flex-wrap justify-between p-6 mobile:p-4 bg-ground100 rounded-lg'>
                <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>
                    <span className='tablet:w-[200px] tablet:text-[1.2rem] font-medium text-geryDarkBlue'>프로젝트 권한</span>
                    <span className='min-w-[100px] flex justify-center grow-0 mx-auto'>
                        <ProjectRoleBadge text={projectMemberAuth.projectMemberAuthName} size='sm'/>
                    </span>
                </div>
                <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>
                    <span
                        className='tablet:w-[200px] tablet:text-[1.2rem] font-medium text-geryDarkBlue'>프로젝트 포지션</span>
                    <span className='min-w-[100px] flex justify-center grow-0 mx-auto'>
                        <PositionBadge text={position.name} size='sm'/>
                    </span>
                </div>
                <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>
                    <span className='tablet:w-[200px] tablet:text-[1.2rem] font-medium text-geryDarkBlue'>크루 상태</span>
                    <span
                        className='min-w-[100px] flex justify-center grow-0 mx-auto text-center tablet:text-lg font-medium text-greyBlue'>
                        <CrewStatusBadge status={status} size='sm'/>
                    </span>
                </div>
            </section>
        </div>
    );
}

export default ProfileSection;