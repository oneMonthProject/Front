import React, {ChangeEvent, useState} from 'react';
import Avatar from "@/components/ui/Avatar";
import {ResponseBody, TechStackItem} from "@/utils/type";
import TechStackImage from "@/components/ui/TechStackImage";
import TrustGradeBadge from "@/components/ui/badge/TrustGradeBadge";
import {VAlertRecruitDetailData} from "@/service/project/alert/type";
import {useQuery} from "@tanstack/react-query";
import {getVAlertRecruitDetail} from "@/service/project/alert/vote/recruit";
import VAlertRecruitModalSkeleton from "@/components/ui/skeleton/project/alert/VAlertRecruitModalSkeleton";
import VoteStatusBadge from "@/components/ui/badge/VoteStatusBadge";
import useVoteRecruit from "@/hooks/useVoteRecruit";
import {VoteOptionCode, VoteRecruitReqData} from "@/service/project/vote/type";
import {VoteOption} from "@/service/project/vote/constant";
import {projectIdState} from "@/store/project/ProjectInfoStateStore";
import {useRecoilValue} from "recoil";
import useCurrentUserPMAuth from "@/hooks/useCurrentUserPMAuth";
import ApplicantProjectHistory from "@/components/project/alert/vote/recruit/modal/ApplicantProjectHisotry";

type VAlertRecruitModalContentsProps = {
    voteId: bigint;
    applyId: bigint;
    alertId: bigint;
}

function VAlertRecruitModalContents({voteId, applyId, alertId}: VAlertRecruitModalContentsProps) {
    const projectId = useRecoilValue(projectIdState);
    const {currentUserPMAuth, isFetchingCurrentUserPMAuth} = useCurrentUserPMAuth(projectId);

    const [agreeChecked, setAgreeChecked] = useState(false);
    const [disagreeChecked, setDisagreeChecked] = useState(false);

    const {voteForProjectRecruit, isUpdating} = useVoteRecruit();

    const {data, isPending, isError} = useQuery<ResponseBody<VAlertRecruitDetailData>, Error>({
        queryKey: ['vAlertRecruitDetailData', voteId, applyId, alertId],
        queryFn: () => getVAlertRecruitDetail(alertId, applyId, voteId),
        staleTime: 0
    });

    if (isPending || isUpdating || isFetchingCurrentUserPMAuth) return <VAlertRecruitModalSkeleton/>;

    if (isError || !data.data || !currentUserPMAuth) return (
        <div
            className='alertModal_contents text-3xl text-gray-600/90 text-center'>⚠️데이터를
            불러올 수 없습니다
        </div>
    );

    const {
        applicantInfo: {
            profileImgSrc,
            nickname,
            position: {positionName},
            intro,
            techStacks,
            projectHistoryTotalCount,
            trustGrade: {trustGradeName},
            trustScore,
            userId
        },
        voteInfo: {
            voteStatus,
            agrees,
            disagrees,
            maxVoteCount
        }
    } = data.data;

    const isVoteEnded = voteStatus.name === "투표종료";

    const barColor = isVoteEnded ? 'bg-gray-400/40' : 'bg-gray-400/80';
    const agreeWidth = agrees > 0 ? Math.floor((agrees / maxVoteCount) * 100) : 0;
    const agreeBarColor = isVoteEnded ? 'bg-green-500/30' : 'bg-green-500';
    const disagreeWidth = disagrees > 0 ? Math.floor((disagrees / maxVoteCount) * 100) : 0;
    const disagreeBarColor = isVoteEnded ? 'bg-red-500/30' : 'bg-red-500';

    const onChangeVoteOptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (confirm("투표 하시겠습니까?")) {
            const reqData: VoteRecruitReqData = {
                voteId,
                applyId,
                authMap: currentUserPMAuth.code,
                answer: e.target.value as VoteOptionCode
            };
            voteForProjectRecruit(reqData);
        } else {
            if (e.target.value === VoteOption.VODA1001.code) {
                setAgreeChecked(false);
            } else {
                setDisagreeChecked(false);
            }
            e.target.blur();
        }
    }

    return (
        <section className='alertModal_contents'>
            <section className='tablet:max-w-[400px] mx-auto pt-5 flex-col items-center border-b border-grey300 '>
                <div><Avatar src={profileImgSrc} alt='사용자 아바타' size='sm'/></div>
                <h3 className='my-1 text-[1.2rem] text-greyDarkBlue font-medium'>{nickname}</h3>
                <div className='text-md text-greyBlue font-medium'>{positionName}</div>
                <div className='mt-1 text-sm text-grey700'>{intro}</div>
                <ul className='mt-2 flex items-center justify-center space-x-1'>
                    {
                        techStacks.map(({techStackName}: TechStackItem) => {
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
                        <span className='text-md text-grey900'>
                            {projectHistoryTotalCount}
                        </span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='mb-2 text-md font-medium text-greyBlue'>신뢰등급</span>
                        <span className='text-grey900'>
                            <TrustGradeBadge size='xs' text={trustGradeName} badgeStyle='text'/>
                        </span>
                    </div>
                    <div className='flex flex-col pl-3 border-l-2 border-grey300'>
                        <span className='mb-2 text-md font-medium text-greyBlue'>신뢰점수</span>
                        <span className='text-md text-grey900'>{trustScore}점</span>
                    </div>
                </div>
                <ApplicantProjectHistory applicantUserId={userId!}/>
            </section>
            <section className='tablet:max-w-[400px] h-[250px] mx-auto flex flex-col justify-center space-y-5'>
                <div className='flex justify-center items-center space-x-1 text-2xl text-greyDarkblue font-medium'>
                    <span>투표</span>
                    <VoteStatusBadge size='sm' voteStatus={voteStatus}/>
                </div>
                {
                    isVoteEnded &&
                    <p className='pb-2 text-[18px] text-lg text-secondary font-semibold'>
                        {
                            agrees > disagrees
                                ? `'${nickname}님이 프로젝트 합류' 안이 가결되었습니다.`
                                : `'${nickname}님의 프로젝트 합류' 안이 부결되었습니다.`
                        }
                    </p>
                }
                <div className='flex justify-center items-center'>
                    <div className='mx-3 text-[18px] text-greyDarkblue font-medium'>찬성</div>
                    <div className={`relative tablet:basis-[60%] h-2 ${barColor} rounded-full`}>
                        <div
                            style={{width: `${agreeWidth}%`}}
                            className={`${agreeBarColor} h-full text-center text-xs text-white rounded-full`}></div>
                        <span
                            className='absolute top-[-7px] left-[102%] text-greyBlue font-medium'>{`${agrees}/${maxVoteCount}`}</span>
                    </div>
                    <div className='ml-12 flex space-x-2 h-5 items-center'>
                        {
                            !isVoteEnded &&
                            <input
                                checked={agreeChecked}
                                onChange={onChangeVoteOptionHandler}
                                type="radio" name='voteOption' id='voteOption_agree' value={VoteOption.VODA1001.code}
                                className='self-stretch border-gray-400 text-indigo-600 focus:ring-none'/>
                        }
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='mx-3 text-[18px] text-greyDarkblue font-medium'>반대</div>
                    <div className={`relative tablet:basis-[60%] h-2 ${barColor} rounded-full`}>
                        <div
                            style={{width: `${disagreeWidth}%`}}
                            className={`${disagreeBarColor} h-full text-center text-xs text-white rounded-full`}></div>
                        <span
                            className='absolute top-[-7px] left-[102%] text-greyBlue font-medium'>{`${disagrees}/${maxVoteCount}`}</span>
                    </div>
                    <div className='ml-12 flex space-x-2 h-5 items-center'>
                        {
                            !isVoteEnded &&
                            <input
                                checked={disagreeChecked}
                                onChange={onChangeVoteOptionHandler}
                                type="radio" name="voteOption" id='voteOption_disagree' value={VoteOption.VODA1002.code}
                                className='self-stretch border-gray-400 text-indigo-600 focus:ring-none'/>
                        }
                    </div>
                </div>

            </section>
        </section>
    );
}

export default VAlertRecruitModalContents;