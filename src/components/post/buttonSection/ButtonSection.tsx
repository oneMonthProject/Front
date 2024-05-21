"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import PositionDropdown from "@/components/main/posts/PositionDropdown";
import { PositionItem, PostInfo } from "@/utils/type";
import { getCookie } from "cookies-next";
import { isEqual } from "lodash";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { confirmModalState, snackbarState } from "@/store/CommonStateStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestParticipationProject as requestParticipationProjectAPI } from "@/service/project/participate";
import { changeRecruitmentStatus as changeRecruitmentStatusAPI } from "@/service/post/post";
import useClientMount from "@/hooks/useClientMount";

const ButtonSection = ({ projectId, boardInfo }: { projectId: bigint, boardInfo: PostInfo }) => {
  const queryClient = useQueryClient();

  const setModalState = useSetRecoilState(confirmModalState);
  const resetModalState = useResetRecoilState(confirmModalState);
  const setSnackbar = useSetRecoilState(snackbarState);
  const mounted = useClientMount();

  const { boardId: postId, boardPositions, recruitmentStatus, user } = boardInfo;
  const currentUserId = getCookie("user_id");
  const isOwner = isEqual(currentUserId?.toString(), user.userId.toString());
  const isComplete = isEqual(recruitmentStatus, true);

  const [position, setPosition] = useState<PositionItem | null>(null);

  const { mutate: requestParticipationProject } = useMutation({
    mutationFn: (positionId: bigint) => requestParticipationProjectAPI(projectId, positionId),
    onSuccess: async (data) => {
      const { message, result } = data;
      if (isEqual(result, "success")) {
        setSnackbar({ show: true, type: "SUCCESS", content: message });
        resetModalState();
      } else {
        setSnackbar({ show: true, type: "ERROR", content: message });
      }
    },
    onError: (err) => {
      console.log("err", err);
    }
  });

  const { mutate: changeRecruitmentStatus } = useMutation({
    mutationFn: () => changeRecruitmentStatusAPI(BigInt(postId)),
    onSuccess: (data) => {
      const { message, result } = data;
      if (isEqual(result, "success")) {
        setSnackbar({ show: true, type: "SUCCESS", content: message });
        resetModalState();

        queryClient.invalidateQueries({ queryKey: ['postInfo', postId.toString()] });
      } else {
        setSnackbar({ show: true, type: "ERROR", content: message });
      }
    },
    onError: (err) => {
      console.log("err", err);
    }
  });

  const getPositionSelectItems = () => {
    if (boardPositions.length > 0) {
      return boardPositions.map(boardPosition => {
        const { positionId, name } = boardPosition.position;
        return { positionId, positionName: name } as PositionItem;
      })
    }

    return [];
  }

  const changeStatus = () => {
    changeRecruitmentStatus();
  }

  const requestParticipation = () => {
    if (position) {
      requestParticipationProject(position?.positionId);
    }
  }

  const openStatusModal = () => {
    const title = "게시글 상태 변경";
    const status = isComplete ? "모집중" : "모집완료";
    const content = <span>해당 게시글을 <span className='font-bold'>{status}</span> 상태로 변경하시겠습니까?</span>;

    setModalState({ isOpen: true, title, content, onClickConfirmHandler: changeStatus });
  }

  const openConfirmModal = () => {
    const title = "확인";
    const content = <span><span className='font-bold'>{position?.positionName}</span> 포지션으로 참여요청 하시겠습니까?</span>;

    setModalState({ isOpen: true, title, content, onClickConfirmHandler: requestParticipation });
  }

  const handleClick = () => {
    if (position) {
      if (currentUserId) {
        openConfirmModal();
      } else {
        setSnackbar({ show: true, type: "INFO", content: "로그인 후 이용 가능합니다." });
      }
    } else {
      setSnackbar({ show: true, type: "ERROR", content: "지원할 포지션을 선택해주세요." });
    }
  }



  return (
    <div className="flex-col mb-5">
      {
        mounted ? (
          isOwner ? (
            <div className="flex justify-center mt-5 space-x-2">
              <Button type="button" size="lg" theme={isComplete ? "primary-hollow" : "disabled"} disabled={!isComplete} onClickHandler={openStatusModal}>모집중</Button>
              <Button type="button" size="lg" theme={isComplete ? "disabled" : "primary-hollow"} disabled={isComplete} onClickHandler={openStatusModal}>모집완료</Button>
            </div>
          ) : (
            <div className="flex justify-center gap-5 mt-5">
              <PositionDropdown items={getPositionSelectItems()} onChangeValue={setPosition} direction="up" />
              <Button type="button" size="lg" onClickHandler={handleClick}>참여하기</Button>
            </div>
          )
        ) : null
      }
    </div>
  );
};

export default ButtonSection;
