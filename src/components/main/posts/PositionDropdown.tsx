import React from "react";
import Image from "next/image";
import Arrow from "../../../../public/images/bottomarrow.svg";
import { useRecoilValue } from "recoil";
import PositionSelect from "./PositionSelect";
import {
  positionDropdownState,
  selectedPositionState,
} from "@/store/MainStateStore";

interface PositionDropdownProps {
  onClick: () => void;
}

const PositionDropdown = ({ onClick }: PositionDropdownProps) => {
  const currentPosition = useRecoilValue(positionDropdownState);
  const selectedPosition = useRecoilValue(selectedPositionState);
  return (
    <div className="relative" onClick={onClick}>
      <div className="px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer">
        <div className="text-lg text-grey800 mobile:text-sm">
          {selectedPosition}
        </div>
        <Image src={Arrow} alt="화살표버튼" />
      </div>
      {currentPosition && <PositionSelect />}
    </div>
  );
};

export default PositionDropdown;
