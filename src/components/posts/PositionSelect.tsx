import React from "react";
import { selectedPositionState } from "@/store/MainStateStore";
import { useSetRecoilState } from "recoil";

const PositionSelect = () => {
  const setSelectedPosition = useSetRecoilState(selectedPositionState);
  const positions = [
    "전체",
    "프론트엔드",
    "백엔드",
    "디자이너",
    "IOS",
    "안드로이드",
    "데브옵스",
  ];
  return (
    <div className="absolute top-12">
      <div className="p-2 flex flex-col w-[150px] h-[auto] mobile:w-[130px] mobile:h-[auto]  border-2 rounded-3xl bg-white">
        {positions.map((position) => (
          <div
            key={position}
            className="p-2 text-lg mobile:text-sm font-bold text-grey900 cursor-pointer"
            onClick={() => setSelectedPosition(position)}
          >
            {position}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PositionSelect;
