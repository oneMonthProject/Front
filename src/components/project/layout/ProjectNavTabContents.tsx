'use client';
import React, {Suspense} from 'react';
import {currentProjectNavTabSelector} from "@/store/project/ProjectNavTabStateStore";
import {useRecoilValue} from "recoil";

interface ProjectNavTabContentsProps {
    slots: {
        task: React.ReactNode
        crews: React.ReactNode
        notice: React.ReactNode
        setting: React.ReactNode
    }
}

function ProjectNavTabContents({slots: {task, crews, notice, setting}}: ProjectNavTabContentsProps) {
    const currentNavTab = useRecoilValue(currentProjectNavTabSelector);

    let contents: React.ReactNode;
    if (currentNavTab == null) contents = task;
    else switch (currentNavTab!.name) {
        case '업무':
            contents = task;
            break;
        case '크루':
            contents = crews;
            break;
        case '알림':
            contents = notice;
            break;
        case '프로젝트 설정':
            contents = setting;
            break;
        default:
            contents = task;
    }

    return (
        <>
            {contents}
        </>
    );
}

export default ProjectNavTabContents;