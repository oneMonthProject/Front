'use client';
import React, {useEffect} from "react";
import TitleSection from "./titleSection/TitleSection";
import ProjectInfoSection from "./infoSection/ProjectInfoSection";
import ProjectIntroSection from "./bodySection/ProjectIntroSection";
import {useQuery} from "@tanstack/react-query";
import {PostInfo, ResponseBody} from "@/utils/type";
import {getPost} from "@/service/post/post";
import PostDetailSkeleton from "@/components/ui/skeleton/postDetail/PostDetailSkeleton";
import JoinProject from "@/components/postDetail/joinProject/JoinProject";
import useProjectInfoSummary from "@/hooks/useProjectInfoSummary";
import {numStrToBigInt} from "@/utils/common";
import {useResetRecoilState} from "recoil";
import {selectRecruitPositionState} from "@/store/postDetail/PostDetailStateStore";

const PostDetail = ({postId, projectId}: { postId: string, projectId: string }) => {
    const {data: projectInfo, isFetching: isFetchingProjectInfo} = useProjectInfoSummary(projectId);
    const resetRecruitPositionState = useResetRecoilState(selectRecruitPositionState);

    // unmount시 모집포지션 select state 초기화
    useEffect(() => {
        return () => resetRecruitPositionState()
    }, [resetRecruitPositionState]);

    const {
        data: postInfo,
        isFetching: isFetchingPostInfo,
    } = useQuery<ResponseBody<PostInfo>, Error, ResponseBody<PostInfo>>({
        queryKey: ['postInfo', postId],
        queryFn: () => getPost(numStrToBigInt(postId)),
        staleTime: 0
    });


    if (isFetchingProjectInfo || isFetchingPostInfo) return <PostDetailSkeleton/>;

    const projectInfoData = projectInfo!.data!;
    const postInfoData = postInfo!.data!;

    return (
        <div className="p-5 mobile:p-1">
            <header>
                <TitleSection boardInfo={postInfoData}/>
            </header>
            <main>
                <ProjectInfoSection
                    projectInfo={projectInfoData}
                    contact={postInfoData.contact}
                    boardPositions={postInfoData.boardPositions}
                />
                <ProjectIntroSection content={postInfoData.content}/>
            </main>
            <footer className="flex-col mb-5">
                <JoinProject projectId={projectInfoData.projectId} boardInfo={postInfoData}/>
            </footer>
        </div>
    );


};

export default PostDetail;
