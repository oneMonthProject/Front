'use client';
import React from 'react';
import {redirect} from "next/navigation";
import {useQueryString} from "@/hooks/useQueryString";

function ProjectPage() {
    const projectId = useQueryString('projectId');

    // 프로젝트 상세 > 업무 탭으로 redirect
    redirect(`/project/task?projectId=${projectId}`);

    return (
        <div></div>
    );
}

export default ProjectPage;