'use client';
import React, {useEffect, useState} from 'react';
import {redirect} from "next/navigation";
import {useSetRecoilState} from "recoil";
import {projectStateStore} from "@/store/project/ProjectStateStore";
import {currentProjectNavTab} from "@/store/project/ProjectNavTabStateStore";

function ProjectPage({params: {projectId}}: { params: { projectId: string; } }) {
    const setProjectState = useSetRecoilState(projectStateStore);
    const setCurrentProjectNavTab = useSetRecoilState(currentProjectNavTab);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setProjectState({projectId});
        setCurrentProjectNavTab(`/project/${projectId}/task`);
        setIsReady(true);
    }, []);

    if(isReady) redirect(`/project/${projectId}/task`);

    return (
        <div></div>
    );
}

export default ProjectPage;