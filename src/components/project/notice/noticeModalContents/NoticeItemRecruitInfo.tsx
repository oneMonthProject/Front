import React from 'react';
import TechStackImage from "@/components/ui/TechStackImage";
import TrustGradeBadge from "@/components/ui/badge/TrustGradeBadge";
import Avatar from "@/components/ui/Avatar";
import {useRecoilValue} from "recoil";
import {projectNoticeCurrentFormState, ProjectNoticeRecruitForm} from "@/store/project/notice/ProjectNoticeStateStore";
import {useSuspenseQuery} from "@tanstack/react-query";
import {ProfileInfo, ResponseBody, TechStackItem} from "@/utils/type";
import {getUserInfoByUserId} from "@/service/user/user";

function NoticeItemRecruitInfo() {
    const currentNoticeForm = useRecoilValue(projectNoticeCurrentFormState);

    const {form:{sendUserId}} = currentNoticeForm as ProjectNoticeRecruitForm;

    const {data} = useSuspenseQuery<ResponseBody<ProfileInfo>, Error>({
        queryKey: ['userInfoById', sendUserId],
        queryFn: () => getUserInfoByUserId(sendUserId)
    });

    const {
        intro,
        nickname,
        position: {positionName},
        profileImgSrc,
        projectHistoryTotalCount,
        techStacks,
        trustGrade: {trustGradeName},
        trustScore
    }:ProfileInfo = data.data;


    return (
        <section className='tablet:max-w-[400px] mx-auto pt-5 flex-col items-center border-t border-b border-grey300 '>
            <div><Avatar src={profileImgSrc} alt='사용자 아바타' size='sm'/></div>
            <h3 className='my-1 text-[1.2rem] text-greyDarkBlue font-medium'>{nickname}</h3>
            <div className='text-md text-greyBlue font-medium'>{positionName}</div>
            <div className='mt-1 text-sm text-grey700'>{intro}</div>
            <ul className='mt-2 flex items-center justify-center space-x-1'>
                {
                    techStacks.map(({techStackName}:TechStackItem) => {
                        return (
                            <li
                                key={techStackName}
                                className='relative h-10 w-10'
                            >
                                <TechStackImage stackName={techStackName.toLowerCase()}/>
                            </li>
                        )
                    })
                }
            </ul>
            <div className='mt-5 mb-7 flex items-center justify-center space-x-4'>
                <div className='flex flex-col px-3 border-r-2 border-grey300'>
                    <span className='mb-2 text-md font-medium text-greyBlue'>프로젝트</span>
                    <span className='text-md text-grey900'>{projectHistoryTotalCount}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='mb-2 text-md font-medium text-greyBlue'>신뢰등급</span>
                    <span className='text-grey900'><TrustGradeBadge size='xs' text={trustGradeName}/></span>
                </div>
                <div className='flex flex-col pl-3 border-l-2 border-grey300'>
                    <span className='mb-2 text-md font-medium text-greyBlue'>신뢰점수</span>
                    <span className='text-md text-grey900'>{trustScore}점</span>
                </div>
            </div>
        </section>
    );
}

export default NoticeItemRecruitInfo;