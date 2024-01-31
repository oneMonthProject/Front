import React from 'react';

function ProjectCrewDetailLayout({children}: { children: React.ReactNode }) {
    return (
        <section className='pc:max-w-[1200px] tablet:max-w-[700px] mx-auto mt-6 px-1'>
            {children}
        </section>
    );
}

export default ProjectCrewDetailLayout;