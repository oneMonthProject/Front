import React, {ReactNode} from 'react';
import CrewListButton from "@/components/project/crews/CrewListButton";

function ProjectCrewDetailPageLayout({children}: { children: ReactNode }) {

    return (
        <section className='w-full flex flex-col items-center'>
            <section className='w-full px-1'>
                {children}
            </section>
          <section className='mt-7'>
              <CrewListButton/>
          </section>
        </section>
    );
}

export default ProjectCrewDetailPageLayout;