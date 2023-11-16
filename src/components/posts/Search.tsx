import React from "react";
import Image from "next/image";
import Searchicon from "../../../public/images/search.svg";

const Search = () => {
  return (
    <>
      <div className="flex rounded-3xl border-1 border border-grey-300 px-4 bg-grey300 h-[40px]">
        <Image src={Searchicon} alt="검색아이콘" />
        <input
          type="text"
          className="flex-1 border-transparent focus:border-transparent focus:ring-0 bg-grey300"
          placeholder="제목을 입력해보세요."
        />
      </div>
    </>
  );
};

export default Search;
