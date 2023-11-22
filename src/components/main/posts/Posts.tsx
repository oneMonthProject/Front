import React from "react";
import Search from "./Search";
import PostCard from "../postCard/PostCard";
import { useRecoilState } from "recoil";
import { positionDropdownState } from "@/store/MainStateStore";
import PositionDropdown from "./PositionDropdown";
import TechstackDropdown from "./TechstackDropdown";
import { techstackDropdownState } from "@/store/MainStateStore";

const Posts = () => {
  const [positionOpen, setPositionOpen] = useRecoilState(positionDropdownState);
  const [techstackOpen, setTechstackOpen] = useRecoilState(
    techstackDropdownState
  );

  const handleTechstackClick = () => {
    setTechstackOpen((current) => !current);
    if (positionOpen) {
      setPositionOpen(false);
    }
  };

  const handlePositionClick = () => {
    setPositionOpen((current) => !current);
    if (techstackOpen) {
      setTechstackOpen(false);
    }
  };
  return (
    <>
      <div className="flex-col">
        <div className="mt-6 flex justify-between ">
          <div className=" flex space-x-5">
            <TechstackDropdown onClick={handleTechstackClick} />
            <PositionDropdown onClick={handlePositionClick} />
          </div>
          <div className="mobile:hidden">
            <Search />
          </div>
        </div>
        <div className="grid pc:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 mt-10 gap-10 mobile:bg-grey200 mobile:gap-5">
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </>
  );
};

export default Posts;
