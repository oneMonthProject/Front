"use client";

import ImageSlider from "@/components/imageslider/ImageSlider";
import MyProjectPosts from "@/components/myprojectpost/MyProjectPosts";
import Posts from "@/components/posts/Posts";
import Search from "@/components/posts/Search";
import PostTabMenu from "@/components/posttabmenu/PostTabMenu";
import { activeTabState } from "@/store/MainStateStore";
import React from "react";
import { useRecoilValue } from "recoil";

function HomePage() {
  const currentTab = useRecoilValue(activeTabState);

  return (
    <>
      <ImageSlider />
      <div className="pc:max-w-[1200px] tablet:max-w-[750px] mobile:max-w-[340px] mx-auto mt-10">
        {currentTab ? null : (
          <div className="pc:hidden tablet:hidden">
            <Search />
          </div>
        )}

        <PostTabMenu />
        {currentTab ? <MyProjectPosts /> : <Posts />}
      </div>
    </>
  );
}

export default HomePage;
