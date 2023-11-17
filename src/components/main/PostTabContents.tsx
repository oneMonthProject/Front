'use client';
import React from 'react';
import MyProjectPosts from "@/components/main/myProjectPost/MyProjectPosts";
import Posts from "@/components/main/posts/Posts";
import {useRecoilValue} from "recoil";
import {activeTabState} from "@/store/MainStateStore";

function PostTabContents() {
    const isMyProjectPostsTab = useRecoilValue(activeTabState);
    return (
        <>
            {isMyProjectPostsTab ? <MyProjectPosts/> : <Posts/>}
        </>
    );
}

export default PostTabContents;