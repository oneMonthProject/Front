import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import { DropDownItem, DropDownProps } from "@/utils/type";
import { classNames } from "@/utils/common";

interface PositionDropDownProps extends DropDownProps {
  value: DropDownItem | null;
  setValue: (value: DropDownItem) => void;
  direction?: "up" | "down";
}

const PositionDropdown = ({ items, value, direction = "down", setValue }: PositionDropDownProps) => {
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
    <div ref={dropdownRef} className="relative self-center" onClick={() => setOpenDropdown(!openDropdown)}>
      <div className="px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer">
        <div className="text-lg text-grey800 mobile:text-sm">
          {value ? value.name : "포지션"}
        </div>
        <BsChevronDown className="w-4 h-4 text-grey800" />
      </div>
      {openDropdown && (
        <div className={classNames("absolute", direction === "up" ? "bottom-12" : "top-12")}>
          <div className="p-2 flex flex-col w-[150px] h-[auto] mobile:w-[130px] mobile:h-[auto]  border-2 rounded-3xl bg-white">
            {items.map((item) => (
              <div
                key={item.value}
                className="p-2 text-lg mobile:text-sm font-bold text-grey900 cursor-pointer"
                onClick={() => setValue(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PositionDropdown;
