import React from 'react';
import BadgeStyleSkeleton from "@/components/ui/skeleton/BadgeStyleSkeleton";
import ButtonStyleSkeleton from "@/components/ui/skeleton/ButtonStyleSkeleton";
import SquareSkeleton from "@/components/ui/skeleton/SquareSkeleton";
import TaskListSkeleton from "@/components/ui/skeleton/project/task/TaskListSkeleton";

function TaskSectionSkeleton() {
    return (
        <>
            <div className='w-full flex items-center justify-start mb-4'>
                <ButtonStyleSkeleton>+ 업무 추가</ButtonStyleSkeleton>
                <div className='ml-4 mr-auto flex items-center space-x-3'>
                    <SquareSkeleton className='my-2 tablet:text-3xl text-transparent'>마일스톤제목</SquareSkeleton>
                    <BadgeStyleSkeleton text='시작전' size='base'/>
                    <div className='flex items-center space-x-3 tablet:text-xl text-transparent'>
                        <SquareSkeleton>yyyy-mm-dd</SquareSkeleton>
                        <SquareSkeleton>yyyy-mm-dd</SquareSkeleton>
                    </div>
                </div>
            </div>
            <TaskListSkeleton itemCount={6}/>
        </>
    );
}

export default TaskSectionSkeleton;