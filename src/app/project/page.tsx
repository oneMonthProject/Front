'use client';
import React from 'react';
import {redirect} from "next/navigation";
import {useQueryString} from "@/hooks/useQueryString";

function ProjectPage() {
    // todo - accessToken 확인해서 없으면 홈페이지로 돌려보냄


    const projectId = useQueryString('projectId');

    // 프로젝트 상세 > 업무 탭으로 redirect
    redirect(`/project/task?projectId=${projectId}`);

    return (
        <div></div>
    );
}

export default ProjectPage;