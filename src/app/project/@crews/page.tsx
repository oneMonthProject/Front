import React, {Suspense} from 'react';
import CrewList from "@/components/project/crews/CrewList";
import CrewListSkeleton from "@/components/ui/skeleton/project/crews/CrewListSkeleton";

function CrewsPage() {
    return (
        <section className='w-full pc:w-[90%] mobile:max-h-[400px] mr-auto  mobile:overflow-y-scroll'>
            <Suspense fallback={<CrewListSkeleton/>}>
                <CrewList/>
            </Suspense>
        </section>
    );
}

export default CrewsPage;