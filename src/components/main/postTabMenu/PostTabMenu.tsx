'use client';
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { hasCookie } from "cookies-next";
import { activeTabState } from "@/store/post/PostStateStore";
import useClientMount from "@/hooks/useClientMount";

const PostTabMenu = () => {
  const [isMyProjectPostsTab, setIsMyProjectPostsTab] = useRecoilState(activeTabState);
  const mounted = useClientMount();

  return (
    <div className="flex border-b">
      <div
        className={`p-5 font-bold text-2xl cursor-pointer mobile:text-xl ${isMyProjectPostsTab
          ? "text-greyUnselect"
          : "border-b-2 border-black100 text-black100"
          }`}
        onClick={() => setIsMyProjectPostsTab(false)}
      >
        게시글
      </div>
      {
        mounted && hasCookie("user_id") ? (
          <div
            className={`p-5 font-bold text-2xl cursor-pointer mobile:text-xl ${isMyProjectPostsTab
              ? "border-b-2 border-black100 text-black100"
              : "text-greyUnselect"
              }`}
            onClick={() => setIsMyProjectPostsTab(true)}
          >
            내 프로젝트
          </div>
        ) : null
      }
    </div>
  );
};

export default PostTabMenu;
