// 'use client';

import {Suspense} from 'react';
import Milestones from "@/components/project/task/milestone/Milestones";
import MilestoneAddButton from "@/components/project/task/milestone/MilestoneAddButton";
import {MilestoneSectionSkeleton} from "@/components/ui/skeleton/project/task";
import useClientMount from "@/hooks/useClientMount";


function MilestoneSection() {
    const mounted = useClientMount();

    return mounted && (
        <section className='w-full flex flex-col items-start'>
            <Suspense fallback={<MilestoneSectionSkeleton/>}>
                <MilestoneAddButton/>
                <Milestones/>
            </Suspense>
        </section>
    );
}

export default MilestoneSection;