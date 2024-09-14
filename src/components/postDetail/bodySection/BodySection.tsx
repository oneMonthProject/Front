import React from "react";

const BodySection = ({ content } : { content: string }) => {
  return (
    <div className='min-h-[250px] mobile:min-h-[150px] flex flex-col justify-center'>
      <div className="text-2xl font-bold text-black100 mobile:text-xl">
        프로젝트 소개
      </div>
      <div className="py-10 mobile:py-5 border-t-2 border-b-2 mt-5 mobile:mt-3">
        {content}
      </div>
    </div>
  );
};

export default BodySection;
