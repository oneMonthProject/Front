import React from 'react';

function ProjectInfoItem({
                             title,
                             contents
                         }: { title: string, contents: React.ReactNode }) {
    return (
        <>
            <div aria-hidden={true} className='flex items-center my-3'>
                <div className='w-[5rem] mr-10 text-center text-grey800'>{title}</div>
                <div>{contents}</div>
            </div>
            <div className='sr-only'>{`${title} : ${contents}`}</div>
        </>
    );
}

export default ProjectInfoItem;