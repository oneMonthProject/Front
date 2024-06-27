import React from "react";
import Search from "./Search";
import TechStackDropdown from "./TechStackDropdown";
import PostList from "./PostList";
import PositionFilter from "@/components/main/searchFilter/PositionFilter";

const Posts = () => {
    return (
        <div className="flex-col">
            <div className="mt-6 flex justify-between mobile:block mobile:space-y-2 mobile:mt-2">
                <div className="flex space-x-5 mobile:space-x-2">
                    <TechStackDropdown/>
                    <PositionFilter />
                </div>
                <Search/>
            </div>
            <PostList/>
        </div>
    );
};

export default Posts;
