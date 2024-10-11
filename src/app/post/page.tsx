import React from "react";
import PostDetail from "@/components/postDetail/PostDetail";
import ConfirmModal from "@/components/ui/ConfirmModal";
import {Metadata} from "next";
import {numStrToBigInt} from "@/utils/common";
import {getPost} from "@/service/post/post";
import {PostInfo, ResponseBody} from "@/utils/type";


export async function generateMetadata({
                                           searchParams: {
                                               postId
                                           }
                                       }: { searchParams: { postId: string } }): Promise<Metadata> {
    const postInfo: ResponseBody<PostInfo> = await getPost(numStrToBigInt(postId));

    return {
        title: `${postInfo.data!.title} - TRUSTCREWS | 책임감 있는 사이드 프로젝트 팀, 팀원을 구하는 방법`,
        description: `${postInfo.data!.content}`
    }
}

const PostDetailPage = ({
                            searchParams: {
                                postId,
                                projectId
                            }
                        }: { searchParams: { postId: string, projectId: string } }) => {
    return (
        <>
            <PostDetail postId={postId} projectId={projectId}/>
            <ConfirmModal/>
        </>
    );
};

export default PostDetailPage;
