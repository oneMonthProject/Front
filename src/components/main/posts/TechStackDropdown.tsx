import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { selectedTechStackState } from "@/store/MainStateStore";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import TechStackSelect from "./TechStackSelect";

const TechStackDropdown = () => {
  const selectedTechStacks = useRecoilValue(selectedTechStackState);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpenDropdown(!openDropdown);
  };

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
    <div ref={dropdownRef} className="relative z-10" onClick={handleClick}>
      <div className="px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer">
        <div className="text-lg text-grey800 mobile:text-sm block truncate">
          {selectedTechStacks.length > 0 ? selectedTechStacks.join(", ") : "기술스택"}
        </div>
        <BsChevronDown className="w-4 h-4 text-grey800" />
      </div>
      {openDropdown && <TechStackSelect />}
    </div>
  );
};

export default TechStackDropdown;