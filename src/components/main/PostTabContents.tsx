'use client';
import React, {Suspense} from 'react';
import MyProjectPosts from "@/components/main/myProjectPost/MyProjectPosts";
import Posts from "@/components/main/posts/Posts";
import {useRecoilValue} from "recoil";
import { activeTabState } from '@/store/post/PostStateStore';
import PostListSkeleton from "@/components/main/PostListSkeleton";

function PostTabContents() {
    const isMyProjectPostsTab = useRecoilValue(activeTabState);
    return (
        <>
            {isMyProjectPostsTab
               ? (
                    <Suspense fallback={<PostListSkeleton itemCount={8}/>}>
                        <MyProjectPosts/>
                    </Suspense>
                )
                : <Posts/>
            }
        </>
    );
}

export default PostTabContents;