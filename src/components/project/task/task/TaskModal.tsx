'use client';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from "recoil";
import Modal from "@/components/ui/Modal";

function TaskModal() {
  const { isOpen, title } = useRecoilValue(taskModalStateSelector);
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const resetCurrentForm = useResetRecoilState(currentTaskFormState);
  const currentForm = useRecoilValue(currentTaskFormState);

  const upsertTask = () => {
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
              onClickConfirmHandler={upsertTask}
            >
              {currentForm !== null && <TaskModalContent />}
            </Modal>
          ), portalElement)
          : null
      }
    </>

  );
}


import {
  currentTaskFormState,
  taskModalStateSelector
} from "@/store/project/task/ProjectTaskStateStore";
import { createPortal } from "react-dom";
import TaskModalContent from './TaskModalContent';

export default TaskModal;