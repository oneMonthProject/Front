import React from 'react';
import {MilestoneInfo} from "@/utils/type";
import {IoEllipsisVertical} from "@react-icons/all-files/io5/IoEllipsisVertical";

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
            className="flex max-w-[300px] items-center justify-between truncate rounded-md border border-gray-200 bg-white shadow-md">
            <div className="flex-1 truncate px-4 py-2 text-sm">
                <a href='#' className="tablet:text-xl font-medium text-gray-900 hover:text-gray-600">
                    {content}
                </a>
                <div className="flex items-center justify-between space-x-1 tablet:text-lg text-gray-500">
                    <span>{start}</span>
                    <span>&#126;</span>
                    <span>{end}</span>
                </div>
            </div>
            <div className="flex-shrink-0 pr-2">
                <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                    <span className="sr-only">Open options</span>
                    <IoEllipsisVertical className="h-5 w-5" aria-hidden="true"/>
                </button>
            </div>
        </div>
    );
}

export default MilestoneCard;