import React from 'react';
import Input from "@/components/ui/form/Input";
import {useRecoilState} from "recoil";
import {postFieldSelector} from "@/store/register/RegisterPostStateStore";

function ProjectOwnerContact() {
    const [{contact}, setContact] = useRecoilState(postFieldSelector('contact'));

    return (
        <Input id="contact"
               label="연락 방법"
               placeholder="오픈 카톡 링크 / 이메일 / 구글 폼 주소"
               value={contact}
               onChange={(e) => setContact({contact:e.target.value})}
        />
    );
}

export default ProjectOwnerContact;