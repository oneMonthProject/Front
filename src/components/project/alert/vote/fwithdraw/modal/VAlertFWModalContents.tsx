import React, {ChangeEvent, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getVAlertFWDetail} from "@/service/project/alert/vote/fwithdraw";
import {VAlertFWDetailData} from "@/service/project/alert/type";
import {ResponseBody} from "@/utils/type";
import Avatar from "@/components/ui/Avatar";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import ProjectRoleBadge from "@/components/ui/badge/ProjectRoleBadge";
import VoteStatusBadge from "@/components/ui/badge/VoteStatusBadge";
import {VoteOption} from "@/service/project/vote/constant";
import {VoteFWReqData, VoteOptionCode} from "@/service/project/vote/type";
import {useRecoilValue, useRecoilValueLoadable} from "recoil";
import {projectIdState, projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";
import {numStrToBigInt} from "@/utils/common";
import useVoteFwithdraw from "@/hooks/useVoteFwithdraw";
import VAlertFwModalSkeleton from "@/components/ui/skeleton/project/alert/VAlertFWModalSkeleton";

type VAlertFWModalContentsProps = {
    voteId: bigint;
    fwMemberId: bigint;
}

function VAlertFwModalContents({voteId, fwMemberId}: VAlertFWModalContentsProps) {
    const [agreeChecked, setAgreeChecked] = useState(false);
    const [disagreeChecked, setDisagreeChecked] = useState(false);
    const {voteForProjectFWithdraw, isUpdating} = useVoteFwithdraw();
    const projectId = useRecoilValue(projectIdState);
    const {state, contents} = useRecoilValueLoadable(projectTaskAuthSelector(null));
    const {data, isPending, isError} = useQuery<ResponseBody<VAlertFWDetailData>, Error>({
        queryKey: ["vAlertFWDetailData", voteId, fwMemberId],
        queryFn: () => getVAlertFWDetail(voteId, fwMemberId),
        staleTime: 0
    });

    if (isPending || state === 'loading' || isUpdating) return <VAlertFwModalSkeleton/>;
    if (isError || !data.data) return <div className='alertModal_contents text-3xl text-gray-600/90 text-center'>⚠️데이터를
        불러올 수 없습니다</div>;


    const {
        fwMemberAuth: {name: fwMemberAuthName},
        fwMemberPosition: {name: fwMemberPositionName},
        fwUserNickname,
        fwUserProfile,
        voteStatus,
        agrees,
        disagrees,
        maxVoteCount,
        reason
    } = data.data;

    const isVoteEnded = voteStatus.name === "투표종료";

    const barColor = isVoteEnded ? 'bg-gray-400/40' : 'bg-gray-400/80';
    const agreeWidth = agrees > 0 ? Math.floor((agrees / maxVoteCount) * 100) : 0;
    const agreeBarColor = isVoteEnded ? 'bg-green-500/30' : 'bg-green-500';
    const disagreeWidth = disagrees > 0 ? Math.floor((disagrees / maxVoteCount) * 100) : 0;
    const disagreeBarColor = isVoteEnded ? 'bg-red-500/30' : 'bg-red-500';

    const onChangeVoteOptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (confirm("투표하시겠습니까?")) {
            const reqData: VoteFWReqData = {
                projectId: numStrToBigInt(projectId as string),
                voteId,
                fw_member_id: fwMemberId,
                authMap: contents.data,
                answer: e.target.value as VoteOptionCode
            };
            voteForProjectFWithdraw(reqData);
        }else{
            if(e.target.value === VoteOption.VODA1001.code){
                setAgreeChecked(false);
            }else{
                setDisagreeChecked(false);
            }
            e.target.blur();
        }
    }


    return (
        <section className='alertModal_contents'>
            <section
                className='tablet:max-w-[400px] mx-auto pt-5 flex-col items-center'>
                <div><Avatar src={fwUserProfile} alt='강제탈퇴 멤버 아바타' size='md'/></div>
                <h3 className='my-1 text-[1.4rem] text-greyDarkBlue font-medium'>{fwUserNickname}</h3>
                <div className='mx-auto flex justify-center space-x-2'>
                    <ProjectRoleBadge text={fwMemberAuthName} size='sm'/>
                    <PositionBadge text={fwMemberPositionName} size='sm'/>
                </div>
            </section>
            <section
                className='tablet:max-w-[400px] h-[100px] mx-auto mt-8 flex flex-col justify-center space-y-3 bg-ground200 rounded-md'>
                <h3 className='text-xl text-greyDarkBlue font-semibold'>강제탈퇴 사유</h3>
                <p className='text-[18px] font-medium text-grey900 text-center'>{reason.name}</p>
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
                                ? `'${fwUserNickname}님의 강제탈퇴' 안이 가결되었습니다.`
                                : `'${fwUserNickname}님의 강제탈퇴' 안이 부결되었습니다.`
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
                                type="radio" name='voteOption' id='voteOption_agree'
                                onChange={onChangeVoteOptionHandler}
                                value={VoteOption.VODA1001.code}
                                checked={agreeChecked}
                                className='self-stretch border-gray-400 text-indigo-600 focus:ring-none'
                            />
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
                                type="radio" name="voteOption" id='voteOption_disagree'
                                onChange={onChangeVoteOptionHandler}
                                value={VoteOption.VODA1002.code}
                                checked={disagreeChecked}
                                className='self-stretch border-gray-400 text-indigo-600 focus:ring-none'
                            />
                        }
                    </div>
                </div>

            </section>

        </section>
    );
}

export default VAlertFwModalContents;