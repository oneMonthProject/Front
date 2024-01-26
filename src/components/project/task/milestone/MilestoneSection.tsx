'use client';

import {Suspense, useEffect, useState} from 'react';
import Milestones from "@/components/project/task/milestone/Milestones";
import MilestoneAddButton from "@/components/project/task/milestone/MilestoneAddButton";
import {ProjectMilestoneSkeleton} from "@/components/ui/skeleton/project";


function MilestoneSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    return mounted && <section className='w-full flex flex-col items-start'>
        <MilestoneAddButton/>
        <Suspense fallback={<ProjectMilestoneSkeleton/>}>
            <Milestones/>
        </Suspense>
    </section>;
}

export default MilestoneSection;