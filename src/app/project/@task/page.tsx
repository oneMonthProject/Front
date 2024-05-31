'use client';

import React from 'react';
import MilestoneModal from '@/components/project/task/milestone/MilestoneModal';
import TaskModal from '@/components/project/task/task/TaskModal';
import Milestones from "@/components/project/task/milestone/Milestones";
import MilestoneAddButton from "@/components/project/task/milestone/MilestoneAddButton";
import TaskSection from "@/components/project/task/task/TaskSection";

function TaskPage({searchParams: {projectId, userId}}: { searchParams: { projectId: string, userId: string } }) {

    return (
        <>
            <section className='w-full flex flex-col items-start'>
                <MilestoneAddButton projectId={projectId} userId={userId}/>
                <Milestones projectId={projectId}/>
                <TaskSection projectId={projectId}/>
            </section>
            <MilestoneModal/>
            <TaskModal/>
        </>
    );
}

export default TaskPage;