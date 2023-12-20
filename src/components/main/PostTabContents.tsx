'use client';
import React, {Suspense} from 'react';
import MyProjectPosts from "@/components/main/myProjectPost/MyProjectPosts";
import Posts from "@/components/main/posts/Posts";
import {useRecoilValue} from "recoil";
import {activeTabState} from "@/store/MainStateStore";

function PostTabContents() {
    const isMyProjectPostsTab = useRecoilValue(activeTabState);
    return (
        <>
            {isMyProjectPostsTab
               ? (
                    <Suspense fallback={<div>loading...</div>}>
                        <MyProjectPosts/>
                    </Suspense>
                )
                : <Posts/>
            }
        </>
    );
}

export default PostTabContents;