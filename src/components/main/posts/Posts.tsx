import React from "react";
import Search from "./Search";
import PostCard from "../postCard/PostCard";
import PositionDropdown from "./PositionDropdown";
import TechStackDropdown from "./TechStackDropdown";

const Posts = () => {
  return (
    <div className="flex-col">
      <div className="mt-6 flex justify-between mobile:block mobile:space-y-2 mobile:mt-2">
        <div className="flex space-x-5 mobile:space-x-2">
          <TechStackDropdown />
          <PositionDropdown />
        </div>
        <Search />
      </div>
      <div className="grid justify-items-center pc:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 mt-6 mobile:mt-2 gap-10 mobile:gap-0 mobile:bg-grey200">
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
};

export default Posts;
