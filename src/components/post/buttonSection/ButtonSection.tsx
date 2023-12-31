"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import PositionDropdown from "@/components/main/posts/PositionDropdown";
import { PositionItem, PostInfo } from "@/utils/type";
import { getCookie } from "cookies-next";
import { isEqual } from "lodash";
import { useSetRecoilState } from "recoil";
import { postModalState } from "@/store/post/PostStateStore";
import { snackbarState } from "@/store/MainStateStore";

const ButtonSection = ({ boardInfo }: { boardInfo: PostInfo }) => {
  const setModalState = useSetRecoilState(postModalState);
  const setSnackbar = useSetRecoilState(snackbarState);

  const [position, setPosition] = useState<PositionItem | null>(null);

  const { boardPositions, completeStatus, user } = boardInfo;
  const currentUserId = getCookie("user_id");
  const isOwner = isEqual(currentUserId?.toString(), user.userId.toString());
  const isComplete = isEqual(completeStatus, true);

  const getPositionSelectItems = () => {

    if (boardPositions.length > 0) {
      return boardPositions.map(boardPosition => {
        const { positionId, name } = boardPosition.position;
        return { positionId, positionName: name } as PositionItem;
      })
    }

    return [];
  }

  const openModal = () => {
    setModalState({ isOpen: true, completeStatus });
  }

  const join = () => {
    if (position) {
      if (currentUserId) {
        // 해당 포지션으로 지원하는 기능이 추가되어야 함
      } else {
        setSnackbar({ show: true, type: "INFO", content: "로그인 후 이용 가능합니다." });
      }
    } else {
      setSnackbar({ show: true, type: "ERROR", content: "지원할 포지션을 선택해주세요." });
    }
  }

  return (
    <div className="flex-col mb-5">
      {isOwner ? (
        <div className="flex justify-center mt-5 space-x-2">
          <Button type="button" size="lg" theme={isComplete ? "primary-hollow" : "disabled"} disabled={!isComplete} onClickHandler={openModal}>모집중</Button>
          <Button type="button" size="lg" theme={isComplete ? "disabled" : "primary-hollow"} disabled={isComplete} onClickHandler={openModal}>모집완료</Button>
        </div>
      ) : (
        <div className="flex justify-center gap-5 mt-5">
          <PositionDropdown items={getPositionSelectItems()} value={position} setValue={setPosition} direction="up" />
          <Button type="button" size="lg" onClickHandler={join}>참여하기</Button>
        </div>
      )}
    </div>
  );
};

export default ButtonSection;
