import React, { Suspense } from "react";
import PostDetail from "@/components/post/PostDetail";
import PostModal from "@/components/post/PostModal";

const PostDetailPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PostDetail />
      </Suspense>
      <PostModal />
    </>
  );
};

export default PostDetailPage;
