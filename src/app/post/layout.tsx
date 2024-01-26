'use client';
import React, { ReactNode } from 'react';
import BackNav from '@/components/ui/BackNav';

interface PostLayoutProps {
  children: ReactNode;
}

function PostLayout({ children }: PostLayoutProps) {

  return (
    <section className='flex-col justify-center mx-auto tablet:pt-[1.5rem] px-[2rem] tablet:px[3rem] mobile:px-[0.5rem] pb-[1rem]'>
      <section className='w-fit cursor-pointer'>
        <BackNav to='/' />
      </section>
      {children}
    </section>
  );
}

export default PostLayout;