'use client';
import React from 'react';

interface UserProjectInfoProps {
  count: number;
  grade: number;
  score: number;
}

function UserProjectInfo({ count, grade, score }: UserProjectInfoProps) {
  return (
    <div className='flex space-x-3 text-center justify-center pt-2 mobile:pt-1'>
      <div className='space-y-1 border-r-2 pr-2 text-sm mobile:text-xs'>
        <p className='text-grey500'>프로젝트</p>
        <p>{count}</p>
      </div>
      <div className='space-y-1 text-sm mobile:text-xs'>
        <p className='text-grey500'>신뢰등급</p>
        <p>{grade}</p>
      </div>
      <div className='space-y-1 border-l-2 pl-2 text-sm mobile:text-xs'>
        <p className='text-grey500 '>신뢰점수</p>
        <p>{score}</p>
      </div>
    </div>
  );
}

export default UserProjectInfo;