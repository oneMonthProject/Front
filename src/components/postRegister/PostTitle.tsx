import React from 'react';
import {useRecoilState} from "recoil";
import {postFieldSelector} from "@/store/register/RegisterPostStateStore";

function PostTitle() {
    const [{title}, setTitle] = useRecoilState(postFieldSelector('title'));

    return (
        <div className="border-b-2 border-grey600 pt-1 pb-2">
            <label htmlFor="postRegister-title" className='flex relative'>
                <input
                    id='postRegister-title'
                    type="text"
                    value={title}
                    onChange={e => setTitle({title: e.target.value})}
                    className="peer appearance-none bg-transparent border-none w-full font-semibold text-3xl mobile:text-lg border text-grey600 mr-3 py-1 px-1 leading-tight focus:border-transparent focus:outline-none focus:ring-transparent"/>
                {
                    title === '' &&
                    <span className='absolute top-[15%] left-0 peer-focus:hidden text-3xl mobile:text-lg text-grey600 font-semibold'>게시글 제목</span>
                }
            </label>
        </div>
    );
}

export default PostTitle;