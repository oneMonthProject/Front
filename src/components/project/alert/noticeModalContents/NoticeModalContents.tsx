'use client';
import React, {ReactNode} from 'react';

function NoticeModalContents({children, content}:{children:ReactNode, content:string}) {
    return (
        <section className='tablet:w-[450px] min-h-[300px] overflow-y-visible flex-col items-center'>
            <section className='tablet:max-w-[400px] mx-auto mt-4 mb-8'>
                <div className='flex flex-col px-8 py-4 rounded-md bg-ground200'>
                    <span className='tablet:text-[1.2rem] mb-3 font-semibold text-grey800'>Message :</span>
                    <span
                        className='tablet:text-[1.4rem] text-grey900 font-semibold text-center'>{content}</span>
                </div>
            </section>
            {children}
        </section>
    );
}

export default NoticeModalContents;