'use client';
import React from "react";
import TitleSection from "./titleSection/TitleSection";
import InfoSection from "./infoSection/InfoSection";
import BodySection from "./bodySection/BodySection";
import {useQuery} from "@tanstack/react-query";
import {PostDetailInfo, ResponseBody} from "@/utils/type";
import {getPost} from "@/service/post/post";
import PostDetailSkeleton from "@/components/ui/skeleton/postDetail/PostDetailSkeleton";
import RecruitStatusButton from "@/components/postDetail/RecruitStatusButton";
import JoinProject from "@/components/postDetail/joinProject/JoinProject";

const PostDetail = ({postId}: { postId: string }) => {
    const {
        data,
        isRefetching,
        isLoading,
        isSuccess
    } = useQuery<ResponseBody<PostDetailInfo>, Error, ResponseBody<PostDetailInfo>>({
        queryKey: ['postInfo', postId],
        queryFn: () => getPost(BigInt(postId))
    });

    if (isRefetching || isLoading) return <PostDetailSkeleton/>;

    if (isSuccess) {
        const postDetail = data.data;
        if (postDetail === null) throw new Error("존재하지 않는 데이터 입니다.");

        const {board, project} = postDetail;


        return (
            <div className="p-5 mobile:p-1 m-auto">
                <TitleSection boardInfo={board}/>
                <InfoSection projectInfo={project} contact={board.contact} boardPositions={board.boardPositions}/>
                <BodySection content={board.content}/>
                <div className="flex-col mb-5">
                    <JoinProject projectId={project.projectId as bigint} boardInfo={board}/>
                </div>
            </div>
        );
    }


};

export default PostDetail;
