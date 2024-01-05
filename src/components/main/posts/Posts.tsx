'use client';

import React, { Suspense } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedPositionState } from "@/store/MainStateStore";
import Search from "./Search";
import PositionDropdown from "./PositionDropdown";
import TechStackDropdown from "./TechStackDropdown";
import PostList from "./PostList";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";

const Posts = () => {
  const selectedPosition = useRecoilValue(selectedPositionState);
  const setSelectedPosition = useSetRecoilState(selectedPositionState);

  return (
    <div className="flex-col">
      <div className="mt-6 flex justify-between mobile:block mobile:space-y-2 mobile:mt-2">
        <div className="flex space-x-5 mobile:space-x-2">
          <Suspense fallback={(
            <div className="px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer">
              <div className="text-base text-grey800 mobile:text-sm block truncate">
                {"기술스택"}
              </div>
              <BsChevronDown className="w-4 h-4 text-grey800" />
            </div>
          )}>
            <TechStackDropdown />
          </Suspense>
          <Suspense fallback={(
            <div className="px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer">
              <div className="text-lg text-grey800 mobile:text-sm">
                {"포지션"}
              </div>
              <BsChevronDown className="w-4 h-4 text-grey800" />
            </div>
          )}>
            <PositionDropdown value={selectedPosition} setValue={setSelectedPosition} />
          </Suspense>
        </div>
        <Search />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <PostList />
      </Suspense>
    </div>
  );
};

export default Posts;
