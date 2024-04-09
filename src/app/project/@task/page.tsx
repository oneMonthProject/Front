'use client';

import React from 'react';
import TaskSection from "@/components/project/task/task/TaskSection";
import MilestoneModal from '@/components/project/task/milestone/MilestoneModal';
import TaskModal from '@/components/project/task/task/TaskModal';
import {useMilestoneList} from "@/hooks/useMilestoneList";
import MilestoneAddButton from "@/components/project/task/milestone/MilestoneAddButton";
import Milestones from "@/components/project/task/milestone/Milestones";
import {useProjectInfo} from "@/hooks/useProjectInfo";
import MilestoneAddButtonSkeleton from "../../../components/ui/skeleton/project/task/MilestoneAddButtonSkeleton";
import {MilestoneListSkeleton, TaskSectionSkeleton} from "@/components/ui/skeleton/project/task";

function TaskPage() {
    const {list: milestoneList, isFetching: isMilestoneFetching} = useMilestoneList();

    const {data: {authMap: {milestoneAuth}}, isFetching: isProjectInfoFetching} = useProjectInfo();

    return (
        <>
            <section className='w-full flex flex-col items-start'>
                {
                    isProjectInfoFetching
                        ? <MilestoneAddButtonSkeleton/>
                        : <MilestoneAddButton milestoneAuth={milestoneAuth}/>
                }
                {
                    isMilestoneFetching
                        ? (
                            <>
                                <MilestoneListSkeleton/>
                                <TaskSectionSkeleton/>
                            </>
                        )
                        : (
                            <>
                                <Milestones milestoneList={milestoneList}/>
                                <TaskSection milestoneList={milestoneList}/>
                            </>
                        )
                }
            </section>
            <MilestoneModal/>
            <TaskModal/>
        </>
    );
}

export default TaskPage;