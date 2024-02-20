import React from 'react';
import Skeleton from "@/components/ui/skeleton/Skeleton";

function CrewListSkeleton() {
    return (
        <ul className='w-full space-y-2'>
            <Skeleton className='h-[70px]'/>
            <Skeleton className='h-[70px]'/>
            <Skeleton className='h-[70px]'/>
            <Skeleton className='h-[70px]'/>
            <Skeleton className='h-[70px]'/>
        </ul>
    );
}

export default CrewListSkeleton;