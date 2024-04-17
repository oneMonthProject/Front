import React from 'react';
import {useRecoilState} from "recoil";
import {postFieldSelector} from "@/store/register/RegisterPostStateStore";

function PostTitle() {
    const [{title}, setTitle] = useRecoilState(postFieldSelector('title'));

    return (
        <div className="flex items-center border-b-2 border-grey600 py-2 mobile:py-0">
            <input
                type="text"
                placeholder="제목을 입력해주세요."
                aria-label="title"
                value={title}
                onChange={e => setTitle({title: e.target.value})}
                className="appearance-none bg-transparent border-none w-full placeholder-grey600 font-semibold text-2xl mobile:text-lg border text-grey600 mr-3 py-1 px-2 leading-tight focus:border-transparent focus:outline-none focus:ring-transparent"/>
        </div>
    );
}

export default PostTitle;