import React, {Suspense} from 'react';
import CrewList from "@/components/project/crews/CrewList";
import CrewListSkeleton from "@/components/ui/skeleton/project/crews/CrewListSkeleton";

function CrewsPage({searchParams: {projectId, userId}}: { searchParams: { projectId: string, userId:string } }) {
    return (
        <section className='w-full pc:w-[90%] mobile:max-h-[400px] mx-auto  mobile:overflow-y-scroll'>
            <CrewList projectId={projectId} userId={userId}/>
        </section>
    );
}

export default CrewsPage;