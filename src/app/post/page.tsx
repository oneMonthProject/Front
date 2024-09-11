import React from "react";
import PostDetail from "@/components/postDetail/PostDetail";
import ConfirmModal from "@/components/ui/ConfirmModal";

const PostDetailPage = ({searchParams: {postId, projectId}}: { searchParams: { postId: string, projectId:string } }) => {
    return (
        <>
            <PostDetail postId={postId} projectId={projectId}/>
            <ConfirmModal/>
        </>
    );
};

export default PostDetailPage;
