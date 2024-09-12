'use client';

import React from 'react';
import TaskModal from '@/components/project/work/work/TaskModal';
import Milestones from "@/components/project/work/milestone/Milestones";
import MilestoneAddButton from "@/components/project/work/milestone/MilestoneAddButton";
import TaskSection from "@/components/project/work/work/TaskSection";
import MilestoneAddModal from "@/components/project/work/milestone/modal/add/MilestoneAddModal";
import MilestoneModModal from "@/components/project/work/milestone/modal/mod/MilestoneModModal";

function TaskPage({searchParams: {projectId, userId}}: { searchParams: { projectId: string, userId: string } }) {

    return (
        <>
            <section className='w-full flex flex-col items-start'>
                <MilestoneAddButton projectId={projectId} userId={userId}/>
                <Milestones projectId={projectId}/>
                <TaskSection projectId={projectId}/>
            </section>
            <MilestoneModModal/>
            <MilestoneAddModal/>
            <TaskModal/>
        </>
    );
}

export default TaskPage;