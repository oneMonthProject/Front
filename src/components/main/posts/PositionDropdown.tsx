import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import { PositionItem } from "@/utils/type";
import { classNames } from "@/utils/common";
import { usePositionList } from "@/hooks/usePositionList";

interface PositionDropDownProps {
  items?: PositionItem[];
  value: PositionItem | null;
  setValue: (value: PositionItem | null) => void;
  direction?: "up" | "down";
}

const PositionDropdown = ({ items, value, direction = "down", setValue }: PositionDropDownProps) => {
  const positions = usePositionList();

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const getPositions = () => {
    if (items) {
      return items;
    } else {
      const all = { positionId: BigInt(0), positionName: "전체보기" };
      return [all, ...positions];
    }
  }

  const changePosition = (position: PositionItem) => {
    if (position.positionId === BigInt(0)) {
      setValue(null);
    } else {
      setValue(position);
    }
  }

  const handleDocumentClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-10 self-center" onClick={() => setOpenDropdown(!openDropdown)}>
      <div className="px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer">
        <div className="text-lg text-grey800 mobile:text-sm">
          {value ? value.positionName : "포지션"}
        </div>
        <BsChevronDown className="w-4 h-4 text-grey800" />
      </div>
      {openDropdown && (
        <div className={classNames("absolute", direction === "up" ? "bottom-12" : "top-12")}>
          <div className="p-2 flex flex-col w-[150px] h-[auto] mobile:w-[130px] mobile:h-[auto]  border-2 rounded-3xl bg-white">
            {getPositions().map((position) => (
              <div
                key={position.positionId.toString()}
                className="p-2 text-lg mobile:text-sm font-bold text-grey900 cursor-pointer"
                onClick={() => changePosition(position)}
              >
                {position.positionName}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PositionDropdown;
