'use client';
import React from "react";
import TitleSection from "./titleSection/TitleSection";
import InfoSection from "./infoSection/InfoSection";
import BodySection from "./bodySection/BodySection";
import ButtonSection from "./buttonSection/ButtonSection";
import { useQueryString } from "@/hooks/useQueryString";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ResponseBody, PostDetailInfo } from "@/utils/type";
import { getPost } from "@/service/post/post";

const PostDetail = () => {
  const postId = useQueryString('postId');

  const { data } = useSuspenseQuery<ResponseBody<PostDetailInfo>, Error>({
    queryKey: ['postInfo', postId],
    queryFn: () => getPost(BigInt(postId))
  });

  const { board, project } = data.data;

  return (
    <div className="p-5 mobile:p-1 m-auto">
      <TitleSection boardInfo={board} />
      <InfoSection projectInfo={project} contact={board.contact} boardPositions={board.boardPositions} />
      <BodySection content={board.content} />
      <ButtonSection projectId={project.projectId} boardInfo={board} />
    </div>
  );
};

export default PostDetail;
