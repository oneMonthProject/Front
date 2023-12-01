"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import PositionDropdown from "@/components/main/posts/PositionDropdown";
import { DropDownItem } from "@/utils/type";

const positions = [
  { value: "frontend", name: "프론트엔드" },
  { value: "backend", name: "백엔드" }
];
const ButtonSection = () => {
  const [position, setPosition] = useState<DropDownItem | null>(null);
  const isOwner = false;

  const join = () => {

  }

  return (
    <div className="flex-col mb-5">
      {isOwner ? (
        <div className="flex justify-center mt-5">
          <div className="rounded-full bg-primary mobile:px-3.5 tablet:px-5 mobile:py-1.5 tablet:py-2 mobile:text-lg tablet:text-xl font-semibold text-white shadow-sm">
            모집중
          </div>
        </div>
      ) : (
        <div className="flex justify-center gap-5 mt-5">
          <PositionDropdown items={positions} value={position} setValue={setPosition} direction="up" />
          <Button type="button" size="lg" onClickHandler={join}>참여하기</Button>
        </div>
      )}

    </div>
  );
};

export default ButtonSection;
