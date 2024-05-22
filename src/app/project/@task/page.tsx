'use client';

import React, {useEffect} from 'react';
import MilestoneModal from '@/components/project/task/milestone/MilestoneModal';
import TaskModal from '@/components/project/task/task/TaskModal';
import Milestones from "@/components/project/task/milestone/Milestones";
import MilestoneAddButton from "@/components/project/task/milestone/MilestoneAddButton";
import {useRecoilValueLoadable, useResetRecoilState, useSetRecoilState} from "recoil";
import {projectIdState, projectTaskAuthInitSelector} from "@/store/project/ProjectInfoStateStore";
import TaskSection from "@/components/project/task/task/TaskSection";
import {MilestoneAddButtonSkeleton} from "@/components/ui/skeleton/project/task";

function TaskPage({searchParams: {projectId}}: { searchParams: { projectId: string } }) {
    const {state: authState} = useRecoilValueLoadable(projectTaskAuthInitSelector(projectId)); // 프로젝트 상세정보 중 auth state
    const setProjectId = useSetRecoilState(projectIdState);
    const resetProjectId = useResetRecoilState(projectIdState);

    useEffect(() => { // 마운트시 프로젝트 상세정보 중 ID state로 저장
        setProjectId(projectId);
        return () => resetProjectId(); // 프로젝트 업무 페이지 벗어나면 프로젝트 ID state clear
    }, [projectId, setProjectId, resetProjectId]);


    return (
        <>
            <section className='w-full flex flex-col items-start'>
                {authState === 'loading' ? <MilestoneAddButtonSkeleton/> : <MilestoneAddButton/>}
                <Milestones projectId={projectId}/>
                <TaskSection projectId={projectId}/>
            </section>
            <MilestoneModal/>
            <TaskModal/>
        </>
    );
}

export default TaskPage;