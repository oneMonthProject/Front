'use client';
import React, {ChangeEvent} from 'react';
import {useRecoilState} from "recoil";
import Input from '@/components/ui/form/Input';
import {milestoneModalFormState} from "@/store/project/task/MilestoneStateStore";
import DateRangePicker from "@/components/ui/datepicker/DateRangePicker";


function MilestoneModalContent() {
    const [currentForm, setCurrentForm] = useRecoilState(milestoneModalFormState);

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (currentForm) {
            const updatedForm = {...currentForm, content: event.target.value};
            setCurrentForm(updatedForm);
        }
    }

    const onDateChange = (date: string, target: 'startDate' | 'endDate') => {
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
                    <DateRangePicker
                        startDate={currentForm?.startDate || null}
                        endDate={currentForm?.endDate || null}
                        setStartDate={(date) => onDateChange(date,"startDate")}
                        setEndDate={(date) => onDateChange(date, "endDate")}
                    />
                </div>
                {currentForm?.type === 'modify' && (
                    <div className='max-w-[360px] flex'>
                        <label className="text-gray-700 font-semibold self-center">업데이트</label>
                        <div className='min-w-[280px] h-[42px] mobile:h-[38px] flex space-x-3 ml-auto'>
                            <div
                                className=' pl-2 text-left self-center'>{`${currentForm?.updateDate ? currentForm.updateDate : ""}`}</div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default MilestoneModalContent;