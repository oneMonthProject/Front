'use client';
import React, {MouseEvent} from 'react';
import {MilestoneInfo} from "@/utils/type";
import MilestoneCardMenu from "@/components/project/task/milestone/MilestoneCardMenu";
import {useRecoilState} from "recoil";
import {milestoneActiveStateStore} from "@/store/project/task/MilestoneStateStore";

interface MilestoneCardProps {
    milestoneInfo: MilestoneInfo;
}

function MilestoneCard({milestoneInfo}: MilestoneCardProps) {
    const [{activeId}, setMilestone] = useRecoilState(milestoneActiveStateStore);

    const {
        milestone_id: id,
        milestone_content: content,
        start_date: start,
        end_date: end
    } = milestoneInfo;


    function onClickContentHandler(e: MouseEvent<HTMLElement>) {
        if((e.target as Node).dataset.role === 'milestone-menu') return;
        setMilestone({activeId: id});
    }

    const activeClass = activeId === id ? 'ring-2 ring-primary' : 'shadow-md';
    const textClass = activeId === id ? 'text-secondary' :'text-gray-900';

    return (
        <div
            className={`relative flex pc:max-w-[300px] tablet:max-w-[180px] items-center justify-between truncate rounded-md border border-gray-200 bg-white overflow-visible ${activeClass} cursor-pointer`}
            onClick={onClickContentHandler}
        >
            <div className="flex-1 truncate px-4 py-2 text-sm">
                <span className={`pc:text-xl tablet:text-lg ${textClass} hover:text-secondary`}>
                    {content}
                </span>
                <div
                    className="flex flex-wrap items-center justify-between space-x-1 pc:text-lg tablet:text-md text-gray-500">
                    <span>{start} &#126;</span>
                    <span>{end}</span>
                </div>
            </div>
            <MilestoneCardMenu milestoneId={id}/>
        </div>
    );
}

export default MilestoneCard;