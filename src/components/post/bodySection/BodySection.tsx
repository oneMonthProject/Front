import React from "react";

const BodySection = ({ content } : { content: string }) => {
  return (
    <div>
      <div className="text-2xl font-bold mt-3 mobile:text-xl">
        프로젝트 소개
      </div>
      <div className="py-10 mobile:py-5 border-t-2 border-b-2 mt-5 mobile:mt-3">
        {content}
      </div>
    </div>
  );
};

export default BodySection;
