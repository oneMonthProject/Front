'use client';

import React from "react";
import {useSetRecoilState} from "recoil";
import Search from "./Search";
import PositionDropdown from "./PositionDropdown";
import TechStackDropdown from "./TechStackDropdown";
import PostList from "./PostList";
import {selectedPositionState} from "@/store/post/PostStateStore";

const Posts = () => {
    const setSelectedPosition = useSetRecoilState(selectedPositionState);

    return (
        <div className="flex-col">
            <div className="mt-6 flex justify-between mobile:block mobile:space-y-2 mobile:mt-2">
                <div className="flex space-x-5 mobile:space-x-2">
                    <TechStackDropdown/>
                    <PositionDropdown onChangeValue={setSelectedPosition}/>
                </div>
                <Search/>
            </div>
            <PostList/>
        </div>
    );
};

export default Posts;
