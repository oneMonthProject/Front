'use client';
import React, {useEffect, useState} from 'react';
import {useRecoilValue, useResetRecoilState} from "recoil";
import Modal from "@/components/ui/Modal";
import {taskModalState} from "@/store/project/task/TaskStateStore";
import {createPortal} from "react-dom";
import useUpdateTask from "@/hooks/useUpdateTask";
import useCreateTask from "@/hooks/useCreateTask";
import TaskContent from "@/components/project/work/work/form/TaskContent";
import TaskProgressStatus from "@/components/project/work/work/form/TaskProgressStatus";
import TaskDate from "@/components/project/work/work/form/TaskDate";
import TaskAssignedCrew from "@/components/project/work/work/form/TaskAssignedCrew";
import TaskUpdatedBy from "@/components/project/work/work/form/TaskUpdatedBy";
import TaskContentDetail from "./TaskContentDetail/TaskContentDetail";


function TaskModal() {
    const {isOpen, form} = useRecoilValue(taskModalState);
    const resetCurrentForm = useResetRecoilState(taskModalState);
    const {updateTask, isUpdating} = useUpdateTask();
    const {createTask, isCreating} = useCreateTask();
    const isPending = isUpdating || isCreating;

    const [portalElement, setPortalElement] = useState<Element | null>(null);


    useEffect(() => {
        setPortalElement(document.getElementById('modal'));

        if (!isOpen) {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.overflowY = 'auto';

            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [isOpen]);

    function onClickConfirmHandler(){
        if(form?.type === 'add'){
            createTask(form);
        }else{
            updateTask(form!);
        }
    }

    return (
        <>
            {
                isOpen && form && portalElement
                    ? createPortal((
                        <Modal
                            isOpen={isOpen}
                            close={() => resetCurrentForm()}
                            title={form.title}
                            onClickConfirmHandler={onClickConfirmHandler}
                            isUpdating={isPending}
                        >
                            <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-10 flex-col mt-5'>
                                <div className="space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm">
                                    <TaskContent/>
                                    <TaskProgressStatus/>
                                    <TaskDate/>
                                    <TaskAssignedCrew/>
                                    <TaskUpdatedBy/>
                                    <TaskContentDetail/>
                                </div>
                            </section>
                        </Modal>
                    ), portalElement)
                    : null
            }
        </>

    );
}


export default TaskModal;