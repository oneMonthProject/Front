import React, {Suspense} from 'react';
import CrewList from "@/components/project/crews/CrewList";

function CrewsPage() {
    return (
        <section className='w-full mobile:max-h-[400px] -mt-10 mx-auto  mobile:overflow-y-scroll'>
            <Suspense fallback={<div>loading...</div>}>
                <CrewList/>
            </Suspense>
        </section>
    );
}

export default CrewsPage;