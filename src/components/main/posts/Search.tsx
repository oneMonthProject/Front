"use client";
import React from "react";
import Image from "next/image";
import { activeTabState } from "@/store/MainStateStore";
import { useRecoilValue } from "recoil";

const Search = () => {
  const isMyProjectPostsTab = useRecoilValue(activeTabState);

  return (
    isMyProjectPostsTab && (
      <div className="pc:hidden tablet:hidden">
        <div className="flex rounded-3xl border-1 border border-grey-300 px-4 bg-grey300 h-[40px]">
          <Image
            src="/images/search.svg"
            alt="검색아이콘"
            width={15}
            height={14}
          />
          <input
            type="text"
            className="flex-1 border-transparent focus:border-transparent focus:ring-0 bg-grey300"
            placeholder="제목을 입력해보세요."
          />
        </div>
      </div>
    )
  );
};

export default Search;
