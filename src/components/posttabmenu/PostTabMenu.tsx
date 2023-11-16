import React from "react";
import { useRecoilState } from "recoil";
import { activeTabState } from "@/store/MainStateStore";

const PostTabMenu = () => {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);

  return (
    <div className="flex border-b mt-5">
      <div
        className={`p-5 font-bold text-2xl cursor-pointer mobile:text-xl ${
          activeTab
            ? "text-greyUnselect"
            : "border-b-2 border-black100 text-black100"
        }`}
        onClick={() => setActiveTab(false)}
      >
        게시글
      </div>
      <div
        className={`p-5 font-bold text-2xl cursor-pointer mobile:text-xl ${
          activeTab
            ? "border-b-2 border-black100 text-black100"
            : "text-greyUnselect"
        }`}
        onClick={() => setActiveTab(true)}
      >
        내 프로젝트
      </div>
    </div>
  );
};

export default PostTabMenu;
