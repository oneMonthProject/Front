'use client';
import React from 'react';
import {redirect} from "next/navigation";
import {useQueryString} from "@/hooks/useQueryString";

function ProjectPage() {
    const projectId = useQueryString('projectId');

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