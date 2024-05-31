import React from "react";
import TrustGradeBadge from "../../ui/badge/TrustGradeBadge";
import Image from "next/image";
import Avatar from "@/components/ui/Avatar";
import {ProjectPost} from "@/utils/type";
import {format} from "date-fns";
import Link from "next/link";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {getCookie} from "cookies-next";

interface ProjectCardProps {
    projectPost: ProjectPost;
}

const ProjectCard = ({projectPost}: ProjectCardProps) => {
    const userId = getCookie('user_id');
    const {
        name,
        trustGrade,
        startDate,
        endDate,
        subject,
        members,
        updateDate,
        projectId
    } = projectPost;

    const visibleMembers = members.slice(0, 5);

    return (
        <article className='p-4'>
            <div className="flex mb-[16px]">
                <span className='sr-only'>프로젝트 이름:</span>
                <span className="inline-block mr-3 font-bold text-xl">
                        {name}
                    </span>
                <span className='sr-only'>프로젝트 신뢰등급:</span>
                <TrustGradeBadge size="xs" text={trustGrade.name}/>
            </div>
            <div className="my-2 flex items-center text-base text-gray-600 font-medium">
                <span className='basis-[50px] text-gray-500 font-semibold'>기간</span>
                <span className='sr-only'>시작날짜:</span>
                <time className="inline-block mr-1 " dateTime={`${format(new Date(startDate), 'yyyy-MM-dd')}`}>
                    {`${format(new Date(startDate), 'yyyy-MM-dd')}`}
                </time>
                <span className='text-sm' aria-hidden={true}>&#126;</span>
                <span className='sr-only'>종료날짜:</span>
                <time className="inline-block ml-1" dateTime={`${format(new Date(endDate), 'yyyy-MM-dd')}`}>
                    {format(new Date(endDate), 'yyyy-MM-dd')}
                </time>
            </div>
            <div className="relative my-3 flex items-start">
                <span className='basis-[50px] text-base text-gray-500 font-semibold'>주제</span>
                <div className='group'>
                    <div className='max-w-[180px] truncate text-lg font-semibold'>{subject}</div>
                    <div id="tooltip-subject" role="tooltip"
                         className="customTooltip group-hover:visible">
                        {subject}
                    </div>
                </div>
            </div>
            <div className='my-2 flex items-center space-x-3'>
                <span className='basis-[50px] text-gray-500 font-bold'>멤버</span>
                <ul className="w-full flex -space-x-3 overflow-hidden">
                    {visibleMembers.map(
                        v => (
                            <li key={v.projectMemberId}>
                                <Avatar
                                    size='xs'
                                    alt='프로젝트 멤버 프로필 이미지'
                                    src={v.user.profileImgSrc}
                                />
                            </li>
                        ))}

                </ul>
                {
                    visibleMembers.length < members.length &&
                    <div className='flex items-center space-x-2 text-grey900'>
                        <FaPlus/>
                        <span className='sr-only'>{`외 ${members.length - visibleMembers.length} 명`}</span>
                        <span className='font-medium' aria-hidden={true}>{members.length - visibleMembers.length}</span>
                    </div>
                }
            </div>
            <div className="flex my-5 text-base">
                <span className='basis-[30px] text-gray-500 font-semibold'>
                    <Image src="/images/update.svg" alt="update date" width={20} height={20} className='mx-auto'/>
                </span>
                <span
                    className="ml-5 inline-block font-bold text-grey800">
                        {format(new Date(updateDate), 'yyyy-MM-dd')}
                    </span>
            </div>
            <div className='flex justify-center mt-5 mb-3'>
                <Link
                    href={`/project?projectId=${projectId}&userId=${userId}`}
                    className='mobile:py-1 tablet:py-1.5 mobile:px-3 tablet:px-3.5 mobile:text-sm tablet:text-base text-white rounded-full font-semibold shadow-sm bg-primary'
                    aria-label={`${name} 페이지로 이동`}
                >
                    프로젝트로 이동
                </Link>
            </div>
        </article>
    );
};

export default ProjectCard;
