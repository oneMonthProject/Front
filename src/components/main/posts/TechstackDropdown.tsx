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
      {/* <div className="absolute top-12">
        <div className="p-2 flex flex-col w-[700px] h-[auto] mobile:w-[150px] mobile:h-[auto] border-2 rounded-3xl bg-white">
          <ul className="flex ">
            <li>프론트엔드</li>
            <li>백엔드</li>
            <li>모바일</li>
            <li>기타</li>
            <li>모두보기</li>
          </ul>
        </div>
      </div> 작업중 */}
    </div>
  );
};

export default TechstackDropdown;
