'use client';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from "recoil";
import Modal from "@/components/ui/Modal";

function MilestoneModal() {
  const { isOpen, title } = useRecoilValue(milestoneModalStateSelector);
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const resetCurrentForm = useResetRecoilState(currentMilestoneFormState);
  const currentForm = useRecoilValue(currentMilestoneFormState);

  const upsertMilestone = () => {
    console.log("currentForm", currentForm);
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
              onClickConfirmHandler={upsertMilestone}
            >
              {currentForm !== null && <MilestoneModalContent />}
            </Modal>
          ), portalElement)
          : null
      }
    </>

  );
}


import {
  currentMilestoneFormState,
  milestoneModalStateSelector
} from "@/store/project/task/ProjectTaskStateStore";
import { createPortal } from "react-dom";
import MilestoneModalContent from './MilestoneModalContent';

export default MilestoneModal;