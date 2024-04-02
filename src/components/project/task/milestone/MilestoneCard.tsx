'use client';
import React, {MouseEvent} from 'react';
import {MilestoneInfo} from "@/utils/type";
import MilestoneCardMenu from "@/components/project/task/milestone/MilestoneCardMenu";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
    milestoneActiveStateSelector,
    milestoneListStateStore,
    MilestoneModalForm,
    milestoneModalFormState,
    MilestoneModalFormState
} from "@/store/project/task/MilestoneStateStore";
import MilestoneStatusBadge from "@/components/ui/badge/MilestoneStatusBadge";
import {deleteMilestone as deleteMilestoneAPI} from "@/service/project/milestone";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {snackbarState} from '@/store/CommonStateStore';

interface MilestoneCardProps {
    milestoneInfo: MilestoneInfo;
    slideIndex: number;
}

function MilestoneCard({milestoneInfo, slideIndex}: MilestoneCardProps) {

    const {
        projectId,
        mileStoneId,
        content,
        startDate,
        endDate,
        updateDate,
        createDate,
        progressStatus
    } = milestoneInfo;

    const setSnackBar = useSetRecoilState(snackbarState);
    const activeMilestone = useRecoilValue(milestoneActiveStateSelector);
    const setActiveMilestone = useSetRecoilState(milestoneListStateStore);
    const setMilestoneModalForm = useSetRecoilState<null | MilestoneModalFormState>(milestoneModalFormState);


    const queryClient = useQueryClient();
    const {mutate: deleteMilestone, isPending: isDeleting} = useMutation({
        mutationFn: (mileStoneId: bigint) => deleteMilestoneAPI(mileStoneId),
        onSuccess: async (res) => {
            if (res.message !== 'success') {
                setSnackBar({show: true, content: '프로세스 수행중 에러가 발생했습니다.', type: 'ERROR'});
            } else {
                queryClient.invalidateQueries({queryKey: ['milestoneList']});
                setSnackBar({show: true, content: '마일스톤을 삭제했습니다.', type: 'INFO'});
            }
        },
        onError: (error) => {
            setSnackBar({show: true, content: '프로세스 수행중 에러가 발생했습니다.', type: 'ERROR'});
        }
    })


    function onClickContentHandler(e: MouseEvent<HTMLElement>) {
        if ((e.target as HTMLElement).dataset.role === 'milestone-menu') return;
        setActiveMilestone((prev) => {
            return {list: [...prev.list], activeId: mileStoneId, activeSlideIndex: slideIndex}
        });
    }

    function onEditClickHandler() {
        setMilestoneModalForm(
            new MilestoneModalForm(
                'modify',
                milestoneInfo
            )
        );
    }

    async function onDeleteClickHandler() {
        await deleteMilestone(mileStoneId);
    }


    const activeClass = activeMilestone?.mileStoneId === mileStoneId ? 'ring-2 ring-primary' : 'shadow-md';
    const textClass = activeMilestone?.mileStoneId === mileStoneId ? 'text-secondary' : 'text-gray-900';

    return (
        <div
            className={`relative flex pc:max-w-[300px] tablet:max-w-[180px] py-4 items-center justify-between truncate rounded-md border border-gray-200 bg-white overflow-visible ${activeClass} cursor-pointer`}
            onClick={onClickContentHandler}
        >
            <div className="flex-1 truncate px-4 text-sm">
                <div
                    className={`mb-2 flex flex-wrap items-center space-x-2 pc:text-xl tablet:text-lg ${textClass} hover:text-secondary`}>
                    <span className='max-w-[150px] truncate'>{content}</span>
                    <MilestoneStatusBadge text={progressStatus} size='xs'/>
                </div>
                <div
                    className="flex flex-wrap items-center justify-between space-x-1 pc:text-lg tablet:text-md text-gray-500">
                    <span>{startDate} &#126;</span>
                    <span>{endDate}</span>
                </div>
            </div>
            <MilestoneCardMenu
                milestoneId={mileStoneId}
                onEditClickHandler={onEditClickHandler}
                onDeleteClickHandler={onDeleteClickHandler}
            />
        </div>
    );
}

export default MilestoneCard;