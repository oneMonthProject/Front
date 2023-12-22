'use client';
import React, {MouseEvent} from 'react';
import {MilestoneInfo} from "@/utils/type";
import MilestoneCardMenu from "@/components/project/task/milestone/MilestoneCardMenu";
import {useRecoilState, useSetRecoilState} from "recoil";
import {
    milestoneActiveStateStore,
    milestoneModalFormState,
    MilestoneModalForm,
    MilestoneModalFormState
} from "@/store/project/task/MilestoneStateStore";
import MilestoneStatusBadge from "@/components/ui/badge/MilestoneStatusBadge";

interface MilestoneCardProps {
    milestoneInfo: MilestoneInfo;
}

function MilestoneCard({milestoneInfo}: MilestoneCardProps) {
    const [{activeId}, setMilestone] = useRecoilState(milestoneActiveStateStore);
    const setMilestoneModalForm = useSetRecoilState<null | MilestoneModalFormState>(milestoneModalFormState);

    const {
        mileStoneId,
        content,
        startDate,
        endDate,
        updateDate,
        createDate,
        progressStatus
    } = milestoneInfo;


    function onClickContentHandler(e: MouseEvent<HTMLElement>) {
        if ((e.target as HTMLElement).dataset.role === 'milestone-menu') return;
        setMilestone({activeId: mileStoneId});
    }

    function onEditClickHandler() {
        // todo - 마일스톤 수정 api
        setMilestoneModalForm(
            new MilestoneModalForm(
                'modify',
                milestoneInfo
            )
        );
    }

    function onDeleteClickHandler() {
        // todo - 마일스톤 삭제 api
    }

    const activeClass = activeId === mileStoneId ? 'ring-2 ring-primary' : 'shadow-md';
    const textClass = activeId === mileStoneId ? 'text-secondary' : 'text-gray-900';

    // todo - 마일스톤 상태 뱃지 추가
    return (
        <div
            className={`relative flex pc:max-w-[300px] tablet:max-w-[180px] py-4 items-center justify-between truncate rounded-md border border-gray-200 bg-white overflow-visible ${activeClass} cursor-pointer`}
            onClick={onClickContentHandler}
        >
            <div className="flex-1 truncate px-4 text-sm">
                <div className={`mb-2 flex items-center space-x-2 pc:text-xl tablet:text-lg ${textClass} hover:text-secondary`}>
                    <span>{content}</span>
                    <MilestoneStatusBadge text={progressStatus} size='sm'/>
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