'use client';
import React, {Suspense} from 'react';
import {projectActiveNavState} from "@/store/project/ProjectNavTabStateStore";
import {useRecoilValue} from "recoil";
import {ProjectMenu} from "@/utils/constant";

interface ProjectNavTabContentsProps {
    slots: {
        task: React.ReactNode
        crews: React.ReactNode
        notice: React.ReactNode
        setting: React.ReactNode
    }
}

function ProjectNavTabContents({slots: {task, crews, notice, setting}}: ProjectNavTabContentsProps) {
    const activeNavTab = useRecoilValue(projectActiveNavState);

    let contents: React.ReactNode;
    switch (activeNavTab) {
        case ProjectMenu.TASK:
            contents = task;
            break;
        case ProjectMenu.CREWS:
            contents = crews;
            break;
        case ProjectMenu.NOTICE:
            contents = notice;
            break;
        case ProjectMenu.SETTING:
            contents = setting;
            break;
        default:
            contents = task;
    }

    return (
        <Suspense>
            {contents}
        </Suspense>
    );
}

export default ProjectNavTabContents;