'use client';

import React, {useEffect} from 'react';
import MilestoneModal from '@/components/project/task/milestone/MilestoneModal';
import TaskModal from '@/components/project/task/task/TaskModal';
import Milestones from "@/components/project/task/milestone/Milestones";
import MilestoneAddButton from "@/components/project/task/milestone/MilestoneAddButton";
import {useRecoilValueLoadable, useResetRecoilState, useSetRecoilState} from "recoil";
import {projectIdState, projectTaskAuthInitSelector} from "@/store/project/ProjectInfoStateStore";
import TaskSection from "@/components/project/task/task/TaskSection";
import {useMilestoneList} from "@/hooks/useMilestoneList";
import {
    MilestoneAddButtonSkeleton,
    MilestoneListSkeleton,
    TaskSectionSkeleton
} from "@/components/ui/skeleton/project/task";

function TaskPage({searchParams: {projectId}}: { searchParams: { projectId: string } }) {
    const {state: authState} = useRecoilValueLoadable(projectTaskAuthInitSelector(projectId));
    const setProjectId = useSetRecoilState(projectIdState);
    const resetProjectId = useResetRecoilState(projectIdState);

    const {list: milestoneList, isFetching: isMilestoneFetching} = useMilestoneList(projectId);


    useEffect(() => {
        setProjectId(projectId);
        return () => resetProjectId();
    }, [projectId, setProjectId, resetProjectId]);


    return (
        <>
            <section className='w-full flex flex-col items-start'>
                {authState === 'loading' ? <MilestoneAddButtonSkeleton/> : <MilestoneAddButton/>}
                {isMilestoneFetching
                    ? <>
                        <MilestoneListSkeleton/>
                        <TaskSectionSkeleton/>
                    </>
                    : <>
                        <Milestones milestoneList={milestoneList}/>
                        <TaskSection milestoneList={milestoneList}/>
                    </>

                }
            </section>
            <MilestoneModal/>
            <TaskModal/>
        </>
    );
}

export default TaskPage;