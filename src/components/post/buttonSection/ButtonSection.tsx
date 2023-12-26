"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import PositionDropdown from "@/components/main/posts/PositionDropdown";
import { PositionItem, PostInfo } from "@/utils/type";
import { getCookie } from "cookies-next";
import { isEqual } from "lodash";
import { useRecoilState } from "recoil";
import { postModalState } from "@/store/post/PostStateStore";

const positions = [
  {
    positionId: 9007199254740991n,
    positionName: "프론트엔드",
  },
  {
    positionId: 1234599254740991n,
    positionName: "백엔드",
  }
];
const ButtonSection = ({ boardInfo }: { boardInfo: PostInfo }) => {
  const [modalState, setModalState] = useRecoilState(postModalState);
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
