'use client';

import React from 'react';
import MyProjectPosts from "@/components/main/myProjectPost/MyProjectPosts";
import Posts from "@/components/main/posts/Posts";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {activeTabState} from '@/store/post/PostStateStore';
import ParticipateNoticeModal from "@/components/main/myProjectPost/ParticipateNotice/ParticipateNoticeModal";
import Button from "@/components/ui/Button";
import {userNoticeModalStateStore} from "@/store/UserNoticeModalStateStore";

function PostTabContents() {
    const isMyProjectPostsTab = useRecoilValue(activeTabState);
    const setUserNoticeModal = useSetRecoilState(userNoticeModalStateStore);

    return (
        <>
            {isMyProjectPostsTab
                ? (
                    <>
                        <Button
                            className='mt-10'
                            type='button'
                            onClickHandler={() => setUserNoticeModal({isOpen: true})}
                        >
                            프로젝트 지원 현황
                        </Button>
                        <MyProjectPosts/>
                        <ParticipateNoticeModal/>
                    </>

                )
                : <Posts/>
            }
        </>
    );
}

export default PostTabContents;