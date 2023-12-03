'use client';
import React from 'react';
import { useRecoilState } from 'recoil';
import { TaskForm, currentTaskFormState } from '@/store/project/task/ProjectTaskStateStore';
import Button from "@/components/ui/Button";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";

function TaskSection() {
  const [currentForm, setCurrentForm] = useRecoilState(currentTaskFormState);

  const onClickHandler = () => {
    setCurrentForm(new TaskForm("add", null, "", false, null, null, [], "", null));
  }

  return (
    <section className='w-full flex flex-col items-start'>
      <Button size='md' className='mb-4' onClickHandler={onClickHandler}>
        <span className='flex items-center'>
          <FaPlus className='tablet:w-3 tablet:h-3 mr-2' />
          업무 추가
        </span>
      </Button>
      <div className='w-full h-[14rem] flex items-center justify-center bg-ground200 rounded-lg'>
        <span className='tablet:text-3xl text-grey800 font-semibold'>업무를 추가해 주세요</span>
      </div>
    </section>
  );
}

export default TaskSection;