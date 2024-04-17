import React from 'react';
import TextArea from "@/components/ui/form/TextArea";
import {useRecoilState} from "recoil";
import {postFieldSelector} from "@/store/register/RegisterPostStateStore";

function ProjectIntro() {
    const [{content}, setContent] = useRecoilState(postFieldSelector('content'));

    return (
        <TextArea
            id="information"
            label="프로젝트 소개"
            placeholder="프로젝트에 대해 소개해주세요."
            rows={10}
            cols={25}
            value={content}
            onChange={(e) => setContent({content:e.target.value})}
        />
    );
}

export default ProjectIntro;