import React from 'react';
import Skeleton from "@/components/ui/skeleton/Skeleton";

function CrewTaskHistorySkeleton() {
    return (
        <div className="flow-root tablet:mt-10 mobile:mt-8 mb-8 mx-2">
            {
                <ul role="list" className="-mb-8 flex-column space-y-4">
                    <li className='w-full h-[65px] mobile:h-[45px] flex justify-between space-x-4 items-center pb-8'>
                        <Skeleton className="w-[100px] mobile:w-[60px] h-full"/>
                        <Skeleton className="flex-grow h-full"/>
                        <Skeleton className="w-[120px] mobile:w-[80px] h-full"/>
                    </li>
                    <li className='w-full h-[65px] mobile:h-[45px] flex justify-between space-x-4 items-center pb-8'>
                        <Skeleton className="w-[100px] mobile:w-[60px] h-full"/>
                        <Skeleton className="flex-grow h-full"/>
                        <Skeleton className="w-[120px] mobile:w-[80px] h-full"/>
                    </li>
                    <li className='w-full h-[65px] mobile:h-[45px] flex justify-between space-x-4 items-center pb-8'>
                        <Skeleton className="w-[100px] mobile:w-[60px] h-full"/>
                        <Skeleton className="flex-grow h-full"/>
                        <Skeleton className="w-[120px] mobile:w-[80px] h-full"/>
                    </li>
                    <li className='w-full h-[65px] mobile:h-[45px] flex justify-between space-x-4 items-center pb-8'>
                        <Skeleton className="w-[100px] mobile:w-[60px] h-full"/>
                        <Skeleton className="flex-grow h-full"/>
                        <Skeleton className="w-[120px] mobile:w-[80px] h-full"/>
                    </li>
                    <li className='w-full h-[65px] mobile:h-[45px] flex justify-between space-x-4 items-center pb-8'>
                        <Skeleton className="w-[100px] mobile:w-[60px] h-full"/>
                        <Skeleton className="flex-grow h-full"/>
                        <Skeleton className="w-[120px] mobile:w-[80px] h-full"/>
                    </li>
                </ul>
            }
        </div>
    );
}

export default CrewTaskHistorySkeleton;