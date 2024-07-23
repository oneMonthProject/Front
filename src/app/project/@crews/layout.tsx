import React, {ReactNode} from 'react';
import CrewListButton from "@/components/project/crews/CrewListButton";

function ProjectCrewsPageLayout({children}: { children: ReactNode }) {

    return (
        <section className='w-full flex flex-col items-center px-1'>
            {children}
        </section>
    );
}

export default ProjectCrewsPageLayout;