"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { postSearchValue } from "@/store/MainStateStore";

const Search = () => {
  const [searchValue, setSearchValue] = useRecoilState(postSearchValue);
  const [value, setValue] = useState(searchValue);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchValue(value);
    }
  };

  return (
    <div className="flex rounded-3xl border-1 border border-grey-300 px-4 bg-grey200 h-[40px] mobile:h-[30px]">
      <Image
        src="/images/search.svg"
        alt="검색아이콘"
        width={15}
        height={14}
      />
      <input
        type="text"
        className="flex-1 border-transparent focus:border-transparent focus:ring-0 bg-grey200 mobile:text-sm"
        placeholder="제목을 입력해보세요."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyUp={handleKeyDown}
      />
    </div>
  );
};

export default Search;
