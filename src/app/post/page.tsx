import React, { Suspense } from "react";
import PostDetail from "@/components/post/PostDetail";
import ConfirmModal from "@/components/ui/ConfirmModal";
import PostSkeleton from "@/components/post/PostSkeleton";

const PostDetailPage = () => {
  return (
    <>
      <Suspense fallback={<PostSkeleton />}>
        <PostDetail />
      </Suspense>
      <ConfirmModal />
    </>
  );
};

export default PostDetailPage;
