'use client';

import React from 'react';
import MilestoneModal from '@/components/project/task/milestone/MilestoneModal';
import TaskModal from '@/components/project/task/task/TaskModal';
import Milestones from "@/components/project/task/milestone/Milestones";
import MilestoneAddButton from "@/components/project/task/milestone/MilestoneAddButton";
import {useRecoilValueLoadable} from "recoil";
import {projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";
import TaskSection from "@/components/project/task/task/TaskSection";
import {MilestoneAddButtonSkeleton} from "@/components/ui/skeleton/project/task";

function TaskPage({searchParams: {projectId}}: { searchParams: { projectId: string } }) {
    const {state: authState, contents: authMap} = useRecoilValueLoadable(projectTaskAuthSelector(projectId)); // 프로젝트 상세정보 중 auth state

    return (
        <>
            <section className='w-full flex flex-col items-start'>
                {authState === 'loading' ? <MilestoneAddButtonSkeleton/> : <MilestoneAddButton authMap={authMap}/>}
                <Milestones projectId={projectId}/>
                <TaskSection projectId={projectId}/>
            </section>
            <MilestoneModal/>
            <TaskModal/>
        </>
    );
}

export default TaskPage;