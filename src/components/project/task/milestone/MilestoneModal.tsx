'use client';
import React, {useEffect, useState} from 'react';
import {useRecoilValue, useResetRecoilState} from "recoil";
import Modal from "@/components/ui/Modal";
import {createPortal} from "react-dom";
import MilestoneModalContent from './MilestoneModalContent';
import {milestoneModalFormState, milestoneModalStateSelector} from "@/store/project/task/MilestoneStateStore";
import useCreateMilestone from "@/hooks/useCreateMilestone";
import useUpdateMilestone from "@/hooks/useUpdateMilestone";

function MilestoneModal() {
    const {isOpen, title} = useRecoilValue(milestoneModalStateSelector);
    const [portalElement, setPortalElement] = useState<Element | null>(null);

    const resetCurrentForm = useResetRecoilState(milestoneModalFormState);
    const currentForm = useRecoilValue(milestoneModalFormState);

    const {createMilestone, isCreating} = useCreateMilestone();
    const {updateMilestone, isUpdating} = useUpdateMilestone();

    async function onClickConfirmButtonHandler() {
            const {startDate, endDate, content, progressStatus} = currentForm!;

            if (!content) {
                alert('마일스톤 내용을 입력해 주세요');
                return;
            }

            if (!startDate) {
                alert('시작날짜를 선택해 주세요');
                return;
            }

            if (!endDate) {
                alert('종료날짜를 선택해 주세요');
                return;
            }

            if(currentForm?.type === 'add') {
                await createMilestone();
            } else {

                if(!progressStatus) {
                    alert('마일스톤 진행상태를 선택해 주세요');
                    return;
                }

                await updateMilestone();
            }
    }


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


    return (
        <>
            {
                isOpen && portalElement
                    ? createPortal((
                        <Modal
                            isOpen={isOpen}
                            close={() => resetCurrentForm()}
                            title={title}
                            onClickConfirmHandler={onClickConfirmButtonHandler}
                        >
                            {currentForm !== null && <MilestoneModalContent/>}
                        </Modal>
                    ), portalElement)
                    : null
            }
        </>

    );
}


export default MilestoneModal;