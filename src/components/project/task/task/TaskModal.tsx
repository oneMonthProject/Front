'use client';
import React, {useEffect, useState} from 'react';
import {useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import Modal from "@/components/ui/Modal";
import {TaskModalForm, taskModalFormState, taskModalStateSelector} from "@/store/project/task/TaskStateStore";
import {createPortal} from "react-dom";
import TaskModalContent from './TaskModalContent';
import {upsertTask as upsertTaskApi} from "@/service/project/task";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {snackbarState} from "@/store/MainStateStore";


function TaskModal() {
  const setSnackbar = useSetRecoilState(snackbarState);
  const { isOpen, title } = useRecoilValue(taskModalStateSelector);
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  const resetCurrentForm = useResetRecoilState(taskModalFormState);
  const currentForm = useRecoilValue(taskModalFormState);

  const queryClient = useQueryClient();

  const {mutate: upsertTask, isPending:isUpdating} = useMutation({
    mutationFn: (currentForm:TaskModalForm) => upsertTaskApi(currentForm),
    onSuccess:(res, variables, context) => {
      console.log("upsert data success: ", res);
      if(res.status === 200){
        resetCurrentForm();
        const content =  currentForm?.type === 'add' ? '업무를 생성을 완료했습니다.' : '업무 수정을 완료했습니다.';
        setSnackbar({show:true, type:'SUCCESS', content});
        queryClient.invalidateQueries({queryKey:['taskList']});
      }else{
        setSnackbar({show:true, type:'ERROR', content:'예상치 못한 서버 에러가 발생했습니다.'});
      }
    },
    onError:(error) => {
      console.log('error: ',error);
      setSnackbar({show:true, type:'ERROR', content:'예상치 못한 서버 에러가 발생했습니다.'});
    }
  });


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
              onClickConfirmHandler={() => upsertTask(currentForm!)}
            >
              {currentForm !== null && <TaskModalContent />}
            </Modal>
          ), portalElement)
          : null
      }
    </>

  );
}


export default TaskModal;