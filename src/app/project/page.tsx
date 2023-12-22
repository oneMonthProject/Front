import React, {Suspense} from 'react';
import ProjectInfo from "@/components/project/layout/ProjectInfo";
import ProjectNavTab from "@/components/project/layout/ProjectNavTab";

function ProjectPage() {

    return (
        <>
            <Suspense fallback={<div>loading..</div>}>
                <ProjectInfo/>
            </Suspense>
            <Suspense fallback={<div>loading..</div>}>
                <ProjectNavTab/>
            </Suspense>
        </>
    );
}

export default ProjectPage;