'use client';
import React, {useEffect, useState} from 'react';
import {useRecoilValue, useRecoilValueLoadable, useResetRecoilState} from "recoil";
import Modal from "@/components/ui/Modal";
import {createPortal} from "react-dom";
import MilestoneModalContent from './MilestoneModalContent';
import {milestoneModalFormState, milestoneModalStateSelector} from "@/store/project/task/MilestoneStateStore";
import useCreateMilestone from "@/hooks/useCreateMilestone";
import useUpdateMilestone from "@/hooks/useUpdateMilestone";
import {ProjectAuthMap, ResponseBody} from "@/utils/type";
import {projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";

function MilestoneModal() {
    const {isOpen, title} = useRecoilValue(milestoneModalStateSelector);
    const [portalElement, setPortalElement] = useState<Element | null>(null);

    const resetCurrentForm = useResetRecoilState(milestoneModalFormState);
    const currentForm = useRecoilValue(milestoneModalFormState)!;

    const {createMilestone, isCreating} = useCreateMilestone();
    const {updateMilestone, isUpdating} = useUpdateMilestone();
    const isPending = isCreating || isUpdating;

    function onClickConfirmButtonHandler() {
        if (currentForm.type === 'add') {
            createMilestone();
        } else {
            updateMilestone();
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
                            isUpdating={isPending}
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