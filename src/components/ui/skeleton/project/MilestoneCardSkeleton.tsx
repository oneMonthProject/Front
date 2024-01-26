import React from 'react';
import Skeleton from "@/components/ui/skeleton/Skeleton";
import BadgeStyleSkeleton from "@/components/ui/skeleton/BadgeStyleSkeleton";

function MilestoneCardSkeleton() {
    return (
        <div
            className="flex truncate items-center justify-between pc:max-w-[300px] tablet:max-w-[180px] py-4 rounded-md border border-gray-200 bg-white"
        >
            <div className="flex-1 truncate px-4">
                <div
                    className="grow mb-2 flex items-center space-x-2">
                    <Skeleton sizeClassName='grow'/>
                    <BadgeStyleSkeleton />
                </div>
                <Skeleton sizeClassName='min-w-[120px]'/>
            </div>
            <Skeleton sizeClassName='w-[20px] h-[20px]'/>
        </div>
    );
}

export default MilestoneCardSkeleton;