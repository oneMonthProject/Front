"use client";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
import Image from "next/image";
import Arrow from "../../../../public/images/bottomarrow.svg";
import { useRecoilValue } from "recoil";
import { PostPositionState } from "@/store/PostStateStore";

const ButtonSection = () => {
  const [open, setOpen] = useState(false);
  const Positions = useRecoilValue(PostPositionState);

  return (
    <div className="flex-col mb-40">
      <div className="flex justify-center mt-5">
        <div className="rounded-full bg-primary mobile:px-3.5 tablet:px-5 mobile:py-1.5 tablet:py-2 mobile:text-lg tablet:text-xl font-semibold text-white shadow-sm">
          모집중
        </div>
      </div>
      <div className="flex justify-center gap-5 mt-12">
        <div>
          <div className="relative" onClick={() => setOpen(!open)}>
            <div className="px-4 flex justify-between w-[150px] h-[44px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer">
              <div className="text-lg text-grey800 mobile:text-sm">포지션</div>
              <Image src={Arrow} alt="화살표버튼" />
            </div>
            {open && (
              <div className="absolute top-12">
                <div className="p-2 flex flex-col w-[150px] h-[auto] mobile:w-[130px] mobile:h-[auto]  border-2 rounded-3xl bg-white">
                  {Positions.map((position) => (
                    <div
                      key={position}
                      className="p-2 text-lg mobile:text-sm font-bold text-grey900 cursor-pointer"
                    >
                      {position}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <Button
          type="button"
          size="lg"
          onClickHandler={() => {
            console.log("click");
          }}
        >
          참여하기
        </Button>
      </div>
    </div>
  );
};

export default ButtonSection;
