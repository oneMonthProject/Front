import React, {Suspense} from 'react';
import ProjectInfo from "@/components/project/layout/ProjectInfo";
import ProjectNavTab from "@/components/project/layout/ProjectNavTab";

function ProjectPage() {

    return (
        <Suspense>
            <ProjectInfo/>
            <ProjectNavTab/>
        </Suspense>
    );
}

export default ProjectPage;