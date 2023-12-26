import {Suspense} from 'react';
import Milestones from "@/components/project/task/milestone/Milestones";
import MilestoneAddButton from "@/components/project/task/milestone/MilestoneAddButton";


function MilestoneSection() {

    return (
        <section className='w-full flex flex-col items-start'>
            <MilestoneAddButton/>
            <Suspense fallback={<div>loading...</div>}>
                <Milestones/>
            </Suspense>
        </section>
    );
}

export default MilestoneSection;