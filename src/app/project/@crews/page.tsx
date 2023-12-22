import React from 'react';
import CrewList from "@/components/project/crews/CrewList";

function CrewsPage() {
    return (
        <section className='w-full mobile:max-h-[400px] -mt-10 mx-auto  mobile:overflow-y-scroll'>
            <CrewList/>
        </section>
    );
}

export default CrewsPage;