import React from 'react';
import {MilestoneInfo} from "@/utils/type";
import MilestoneCardMenu from "@/components/project/task/milestone/MilestoneCardMenu";

interface MilestoneCardProps {
    milestoneInfo: MilestoneInfo;
}

function MilestoneCard({
                           milestoneInfo: {
                               milestone_id: id,
                               milestone_content: content,
                               start_date: start,
                               end_date: end
                           }
                       }: MilestoneCardProps) {
    return (
        <div
            className="relative flex pc:max-w-[300px] tablet:max-w-[180px] items-center justify-between truncate rounded-md border border-gray-200 bg-white shadow-md overflow-visible">
            <div className="flex-1 truncate px-4 py-2 text-sm">
                <a href='#' className="pc:text-xl tablet:text-lg font-medium text-gray-900 hover:text-gray-600">
                    {content}
                </a>
                <div className="flex flex-wrap items-center justify-between space-x-1 pc:text-lg tablet:text-md text-gray-500">
                    <span>{start} &#126;</span>
                    <span>{end}</span>
                </div>
            </div>
            <MilestoneCardMenu milestoneId={id}/>
        </div>
    );
}

export default MilestoneCard;