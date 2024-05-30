'use client';

import React from 'react';
import TrustGradeBadge from "@/components/ui/badge/TrustGradeBadge";
import ProjectApplyStatusBadge from "@/components/ui/badge/ProjectApplyStatusBadge";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import Link from "next/link";
import {useProjectInfo} from "@/hooks/useProjectInfo";
import {FormattedUserProjectNotice} from "@/store/UserNoticeModalStateStore";

interface ParticipateNoticeProps {
    participateNotice: FormattedUserProjectNotice;
}

function ParticipateNotice({
                               participateNotice: {
                                   projectId,
                                   projectName,
                                   positionName,
                                   supportResult
                               }
                           }: ParticipateNoticeProps) {


    return (
        <div className='mobile:w-[320px] tablet:w-[450px] flex items-center justify-between'>
            <div className="min-w-0">
                <div className="flex items-center gap-x-3">
                    <p className="mobile:text-sm tablet:text-xl font-semibold leading-6 text-gray-900">{projectName}</p>
                    <PositionBadge text={`${positionName} 지원`} size='sm'/>
                </div>
            </div>
            <div className="flex flex-none items-center">
                <ProjectApplyStatusBadge status={supportResult} size='sm'/>
                {
                    supportResult &&
                    <Link
                    href={`/project?projectId=${projectId}`}
                    className="hidden rounded-md  px-2.5 py-1.5 text-sm font-medium text-white
                     shadow-sm bg-primary sm:block"
                >
                    프로젝트 가기<span className="sr-only">, {projectName}</span>
                </Link>
                }
            </div>
        </div>
    );
}

export default ParticipateNotice;