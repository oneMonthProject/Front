'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from "react-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import Modal from "@/components/ui/Modal";
import { postModalState } from '@/store/post/PostStateStore';

function PostModal() {
  const { isOpen, completeStatus } = useRecoilValue(postModalState);
  const resetOpen = useResetRecoilState(postModalState);
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  const changeCompleteStatus = () => {
    // !completeStatus 전달
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
              close={resetOpen}
              title="게시글 상태 변경"
              onClickConfirmHandler={changeCompleteStatus}
            >
              <section className='my-4 text-lg'>
                해당 게시글을 <span className='font-bold'>{completeStatus ? "모집중" : "모집완료"}</span> 상태로 변경하시겠습니까?
              </section>
            </Modal>
          ), portalElement)
          : null
      }
    </>

  );
}


export default PostModal;