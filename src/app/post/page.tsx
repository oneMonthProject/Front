import React, { Suspense } from "react";
import PostDetail from "@/components/post/PostDetail";
import ConfirmModal from "@/components/ui/ConfirmModal";

const PostDetailPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PostDetail />
      </Suspense>
      <ConfirmModal />
    </>
  );
};

export default PostDetailPage;
