'use client';
import React, { ReactNode } from 'react';
import BackNav from '@/components/ui/BackNav';

interface PostLayoutProps {
  children: ReactNode;
}

function PostLayout({ children }: PostLayoutProps) {

  return (
    <section className='w-full h-full flex flex-col justify-center mx-auto tablet:pt-[1.5rem] px-[2rem] tablet:px-[3rem] mobile:px-[0.5rem] pb-[1rem]'>
      <section className='w-fit pc:h-[100px] h-[60px] flex flex-col justify-center cursor-pointer'>
        <BackNav to='/' />
      </section>
      {children}
    </section>
  );
}

export default PostLayout;