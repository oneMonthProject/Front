import React from "react";
import PostDetail from "@/components/postDetail/PostDetail";
import ConfirmModal from "@/components/ui/ConfirmModal";

const PostDetailPage = ({searchParams: {postId}}: { searchParams: { postId: string } }) => {
    return (
        <>
            <PostDetail postId={postId}/>
            <ConfirmModal/>
        </>
    );
};

export default PostDetailPage;
