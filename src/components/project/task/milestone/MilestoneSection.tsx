'use client';
import {Suspense} from 'react';
import {useSetRecoilState} from 'recoil';
import Button from "@/components/ui/Button";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import Milestones from "@/components/project/task/milestone/Milestones";
import {MilestoneForm, milestoneModalFormState} from "@/store/project/task/MilestoneStateStore";


function MilestoneSection() {
    const setMilestoneModalForm = useSetRecoilState(milestoneModalFormState);

    const onClickHandler = () => {
        setMilestoneModalForm(new MilestoneForm("add", null, "", null, null, ""));
    }

    return (
        <section className='w-full flex flex-col items-start'>
            <Button size='md' className='mb-4' onClickHandler={onClickHandler} aria-label='마일스톤 추가'>
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