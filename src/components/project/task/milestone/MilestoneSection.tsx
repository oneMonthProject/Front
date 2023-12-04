'use client';
import React, { Suspense } from 'react';
import { useRecoilState } from 'recoil';
import Button from "@/components/ui/Button";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import Milestones from "@/components/project/task/milestone/Milestones";
import {currentMilestoneFormState, MilestoneForm} from "@/store/project/task/MilestoneStateStore";

function MilestoneSection() {
  const [currentForm, setCurrentForm] = useRecoilState(currentMilestoneFormState);

  const onClickHandler = () => {
    setCurrentForm(new MilestoneForm("add", null, "", null, null, "", null));
  }

  return (
    <section className='w-full flex flex-col items-start'>
      <Button size='md' className='mb-4' onClickHandler={onClickHandler}>
        <span className='flex items-center'>
          <FaPlus className='tablet:w-3 tablet:h-3 mr-2' />
          마일스톤 추가
        </span>
      </Button>
      <Suspense>
        <Milestones />
      </Suspense>
    </section>
  );
}

export default MilestoneSection;