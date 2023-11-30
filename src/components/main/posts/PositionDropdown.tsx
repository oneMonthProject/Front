import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import PositionSelect from "./PositionSelect";
import { selectedPositionState } from "@/store/MainStateStore";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";

const PositionDropdown = () => {
  const selectedPosition = useRecoilValue(selectedPositionState);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
    <div ref={dropdownRef} className="relative" onClick={() => setOpenDropdown(!openDropdown)}>
      <div className="px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer">
        <div className="text-lg text-grey800 mobile:text-sm">
          {selectedPosition}
        </div>
        <BsChevronDown className="w-4 h-4 text-grey800" />
      </div>
      {openDropdown && <PositionSelect />}
    </div>
  );
};

export default PositionDropdown;
