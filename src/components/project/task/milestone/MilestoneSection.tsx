'use client';
import React, {Suspense} from 'react';
import Button from "@/components/ui/Button";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import Milestones from "@/components/project/task/milestone/Milestones";

// todo - 마일스톤 스켈레톤
// todo - 마일스톤 추가 modal
function MilestoneSection() {

    return (
        <section className='w-full flex flex-col items-start'>
            <Button size='md' className='mb-4'>
                    <span className='flex items-center'>
                        <FaPlus className='tablet:w-3 tablet:h-3 mr-2'/>
                        마일스톤 추가
                    </span>
            </Button>
            <Suspense>
                <Milestones/>
            </Suspense>
        </section>
    );
}

export default MilestoneSection;