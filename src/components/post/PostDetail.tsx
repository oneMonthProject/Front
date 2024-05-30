'use client';
import React from "react";
import TitleSection from "./titleSection/TitleSection";
import InfoSection from "./infoSection/InfoSection";
import BodySection from "./bodySection/BodySection";
import ButtonSection from "./buttonSection/ButtonSection";
import {useQuery} from "@tanstack/react-query";
import {PostDetailInfo, ResponseBody} from "@/utils/type";
import {getPost} from "@/service/post/post";
import PostSkeleton from "@/components/post/PostSkeleton";

const PostDetail = ({postId}: { postId: string }) => {
    const {data, isFetching} = useQuery<Promise<ResponseBody<PostDetailInfo>>, Error, ResponseBody<PostDetailInfo>>({
        queryKey: ['postInfo', postId],
        queryFn: () => getPost(BigInt(postId))
    });

    if (isFetching) return <PostSkeleton/>;

    const {board, project} = data!.data;

    return (
        <div className="p-5 mobile:p-1 m-auto">
            <TitleSection boardInfo={board}/>
            <InfoSection projectInfo={project} contact={board.contact} boardPositions={board.boardPositions}/>
            <BodySection content={board.content}/>
            <ButtonSection projectId={project.projectId as bigint} boardInfo={board}/>
        </div>
    );
};

export default PostDetail;
