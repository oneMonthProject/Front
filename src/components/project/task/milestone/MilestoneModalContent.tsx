'use client';
import React, {ChangeEvent} from 'react';
import {useRecoilState} from "recoil";
import Input from '@/components/ui/form/Input';
import CalendarInput from '@/components/ui/form/CalendarInput';
import {format} from 'date-fns';
import {milestoneModalFormState} from "@/store/project/task/MilestoneStateStore";

function MilestoneModalContent() {
    const [currentForm, setCurrentForm] = useRecoilState(milestoneModalFormState);

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (currentForm) {
            const updatedForm = {...currentForm, content: event.target.value};
            setCurrentForm(updatedForm);
        }
    }

    const onDateChange = (date: Date, target: 'startDate' | 'endDate') => {
        if (currentForm) {
            const updatedForm = {...currentForm, [target]: date};
            setCurrentForm(updatedForm);
        }
    }

    return (
        <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-4 flex-col mt-5'>
            <div className="space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm">
                <div className='flex'>
                    <label htmlFor="content" className="text-gray-700 font-semibold self-center">내용</label>
                    <div className='w-[350px] mobile:w-[220px] ml-auto'>
                        <Input id="content" placeholder="내용을 입력해주세요."
                               value={currentForm?.content} onChange={onInputChange}/>
                    </div>
                </div>
                <div className='flex'>
                    <label className="text-gray-700 font-semibold self-center">기간</label>
                    <div className='flex w-[350px] mobile:w-[220px] ml-auto'>
                        <CalendarInput
                            placeholder="선택"
                            date={new Date(currentForm?.startDate as string) || null}
                            setDate={(date) => onDateChange(date, "startDate")}
                        />
                        <div className="text-gray-700 w-[20px] text-center self-center">~</div>
                        <CalendarInput
                            placeholder="선택"
                            date={new Date(currentForm?.endDate as string) || null}
                            setDate={(date) => onDateChange(date, "endDate")}
                        />
                    </div>
                </div>
                {currentForm?.type === 'modify' && (
                    <div className='flex'>
                        <label className="text-gray-700 font-semibold self-center">업데이트</label>
                        <div className='flex w-[350px] mobile:w-[220px] h-[42px] mobile:h-[38px] space-x-3 ml-auto'>
                            <div
                                className='w-full pl-2 text-left self-center'>{`${currentForm?.updateDate ? currentForm.updateDate : ""}`}</div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default MilestoneModalContent;