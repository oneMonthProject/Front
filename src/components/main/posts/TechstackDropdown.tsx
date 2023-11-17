import React from "react";
import Image from "next/image";
import Arrow from "../../../../public/images/bottomarrow.svg";

interface TechstackDropdownProps {
  onClick: () => void;
}

const TechstackDropdown = ({ onClick }: TechstackDropdownProps) => {
  return (
    <div className="relative" onClick={onClick}>
      <div className="px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer">
        <div className="text-lg text-grey800 mobile:text-sm">기술스택</div>
        <Image src={Arrow} alt="화살표버튼" />
      </div>
    </div>
  );
};

export default TechstackDropdown;
