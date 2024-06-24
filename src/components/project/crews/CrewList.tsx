'use client';
import React from "react";
import Avatar from "@/components/ui/Avatar";
import ProjectRoleBadge from "@/components/ui/badge/ProjectRoleBadge";
import Link from "next/link";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import useProjectCrewList from "@/hooks/useProjectCrewList";
import {ProjectMember} from "@/utils/type";
import {useRecoilValue} from "recoil";
import {projectIdState} from "@/store/project/ProjectInfoStateStore";

export default function CrewList() {
    const projectId = useRecoilValue(projectIdState)!;
    const data = useProjectCrewList(projectId);

    return (
        <ul role="list">
            {data.crewList.map(
                ({
                     position: {name},
                     projectMemberAuth: {projectMemberAuthName},
                     user: {userId, nickname, profileImgSrc},
                     projectMemberId
                 }: ProjectMember) => {
                    return (
                        <li key={userId} className="flex items-center gap-x-6 my-2 py-5 cursor-pointer hover:bg-grey000 shadow-md">
                            <Link
                                href={{
                                    pathname: `/projectCrewDetail`,
                                    query: {projectId, projectMemberId: projectMemberId.toString()}
                                }}
                                className="w-full min-w-0 flex mobile:flex-col items-center mobile:items-start mobile:space-y-3 tablet:px-6 mobile:pl-4">
                                <div className="min-w-0 flex items-center tablet:space-x-6 mobile:space-x-4">
                                    <Avatar size='xs' src={profileImgSrc} alt={`${nickname}의 프로필 이미지`}/>
                                    <p className="tablet:text-[1.2rem] mobile:text-sm font-semibold leading-5 text-gray-900">
                                        {nickname}
                                    </p>
                                    <ul className='flex items-center space-x-3'>
                                        <li><PositionBadge text={name} size='sm'/></li>
                                        <li><ProjectRoleBadge text={projectMemberAuthName} size='sm'/></li>
                                    </ul>
                                </div>
                            </Link>
                        </li>
                    )
                })}
        </ul>
    )
}
