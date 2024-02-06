import React from "react";
import Link from "next/link";
import TrustGradeBadge from "@/components/ui/badge/TrustGradeBadge";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import TechStackImage from "@/components/ui/TechStackImage";
import Avatar from "@/components/ui/Avatar";
import {BsEyeFill} from "@react-icons/all-files/bs/BsEyeFill";
import {PostCardInfo} from "@/utils/type";
import {format} from "date-fns";
import {FaPlusCircle} from "@react-icons/all-files/fa/FaPlusCircle";

const PostCard = ({postInfo}: { postInfo: PostCardInfo }) => {
    const {boardId, boardTitle, project, boardPositions, boardPageView, user} = postInfo;

    const {name: projectName, trustGrade, startDate, endDate, subject, technologyStacks} = project;

    return (
        <article className='p-4'>
            <Link href={`/post?postId=${boardId}`}>
                <div className="text-xl font-bold truncate mb-1">{boardTitle}</div>
                <div className="mt-4 mb-2 flex items-center text-base text-gray-600 font-medium">
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
                <div className="flex my-2">
                    <span className='sr-only'>프로젝트 이름:</span>
                    <span className='basis-[50px] text-base text-gray-500 font-semibold'>팀명</span>
                    <span className="inline-block max-w-[100px] mr-3 font-bold text-lg truncate">
                        {projectName}
                    </span>
                    <span className='sr-only'>프로젝트 신뢰등급:</span>
                    <TrustGradeBadge size="xs" text={trustGrade.name}/>
                </div>
                <div className="relative my-2 flex items-start">
                    <span className='basis-[50px] text-base text-gray-500 font-semibold'>주제</span>
                    <div className='group'>
                        <div className='max-w-[180px] truncate text-lg font-semibold'>{subject}</div>
                        <div id="tooltip-subject" role="tooltip"
                             className="customTooltip group-hover:visible">
                            {subject}
                        </div>
                    </div>
                </div>

                {
                    boardPositions.length > 0 &&
                    <div className="flex items-center gap-2 mt-5">
                        <ul className='flex items-center basis-[180px]'>
                            {
                                boardPositions.slice(0, 3).map(
                                    ({position: {positionId, name}}) =>
                                        (
                                            <li key={positionId.toString()}>
                                                <PositionBadge key={positionId.toString()} size="xs" text={name}/>
                                            </li>
                                        )
                                )
                            }
                        </ul>
                        {
                            boardPositions.length > 3 &&
                            <div className='flex items-center space-x-2'>
                                <FaPlusCircle/>
                                <span
                                    className='pt-1 leading-none text-greyDarkblue/80 font-semibold'>{boardPositions.length - 3}</span>
                            </div>
                        }
                    </div>
                }
                {
                    technologyStacks.length > 0 &&
                    <div className="flex items-center gap-2 border-b-2 pb-4 mt-3 ">
                        <ul className='flex items-center space-x-1 basis-[180px]'>
                            {
                                technologyStacks.slice(0,5).map(({techStackId, techStackName}) => (
                                    <li key={techStackId}>
                                        <TechStackImage
                                            key={techStackId}
                                            stackName={techStackName}
                                            width={30}
                                            height={30}/>
                                    </li>
                                ))
                            }
                        </ul>
                        {
                            technologyStacks.length > 5 &&
                            <div className='flex items-center space-x-2'>
                                <FaPlusCircle/>
                                <span
                                    className='pt-1 leading-none text-greyDarkblue/80 font-semibold'>
                                    {technologyStacks.length - 5}
                                </span>
                            </div>
                        }
                    </div>
                }
                <div className="flex items-center pt-3 px-1 justify-between">
                    <div className="flex">
                        <Avatar size="2xs" alt="사용자" src={user.profileImgSrc}/>
                        <div className="ml-2 text-sm self-center">{user.nickname}</div>
                    </div>
                    <div className="flex">
                        <BsEyeFill className="w-4 h-4 self-center text-grey500"/>
                        <div className="ml-2 text-base text-grey800">{boardPageView}</div>
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default PostCard;
