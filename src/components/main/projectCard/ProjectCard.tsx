import React from "react";
import TrustGradeBadge from "../../ui/badge/TrustGradeBadge";
import Image from "next/image";
import Avatar from "@/components/ui/Avatar";
import {ProjectPost} from "@/utils/type";
import {format} from "date-fns";
import Link from "next/link";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";

interface ProjectCardProps {
    projectPost: ProjectPost;
}

const ProjectCard = ({projectPost}: ProjectCardProps) => {
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
            <div className="flex">
                <span className='sr-only'>프로젝트 이름:</span>
                <span className="inline-block mr-3 font-bold text-base">
                        {name}
                    </span>
                <span className='sr-only'>프로젝트 신뢰등급:</span>
                <TrustGradeBadge size="xs" text={trustGrade.name}/>
            </div>
            <div className="flex items-center mt-2">
                <span className='sr-only'>시작날짜:</span>
                <time className="inline-block mr-2 text-sm" dateTime={`${format(new Date(startDate), 'yyyy-MM-dd')}`}>
                        {`${format(new Date(startDate), 'yyyy-MM-dd')}`}
                </time>
                <span className='text-sm' aria-hidden={true}>&#126;</span>
                <span className='sr-only'>종료날짜:</span>
                <time className="inline-block ml-2 text-sm" dateTime={`${format(new Date(endDate), 'yyyy-MM-dd')}`}>
                        {format(new Date(endDate), 'yyyy-MM-dd')}
                </time>
            </div>
            <div className="text-xl font-bold mt-2">
                <span className='sr-only'>프로젝트 주제:</span>
                {subject}
            </div>
            <div className='mt-5 flex items-center space-x-3'>
                <span className='sr-only'>프로젝트 멤버:</span>
                <ul className="flex -space-x-3 overflow-hidden">
                    {visibleMembers.map(
                        v => (
                            <li key={v.projectMemberId}>
                                <Avatar
                                    size='xs'
                                    alt={v.user.nickname}
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
            <div className="flex my-5">
                <Image src="/images/update.svg" alt="icon" width={15} height={15}/>
                <span
                    className="inline-block ml-1 font-bold text-grey800 text-sm">
                        {`업데이트 : ${format(new Date(updateDate), 'yyyy-MM-dd')}`}
                    </span>
            </div>
            <div className='flex justify-center mt-5 mb-3'>
                <Link href={`/project?projectId=${projectId}`} className='mobile:py-1 tablet:py-1.5 mobile:px-3 tablet:px-3.5 mobile:text-sm tablet:text-base text-white rounded-full font-semibold shadow-sm bg-primary' aria-label={`${name} 페이지로 이동`}>
                        프로젝트로 이동
                </Link>
            </div>
        </article>
    );
};

export default ProjectCard;
