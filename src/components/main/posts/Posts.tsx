import React from "react";
import Search from "./Search";
import TechStackDropdown from "./TechStackDropdown";
import PostList from "./PostList";
import PositionFilter from "@/components/main/searchFilter/PositionFilter";

const Posts = () => {
    return (
        <div className="flex flex-col space-y-5">
            <div className="mt-6 flex justify-between mobile:block mobile:space-y-5">
                <div className="flex space-x-5">
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
