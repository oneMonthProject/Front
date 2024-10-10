'use client';

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import useCreatePost from "@/hooks/useCreatePost";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {
    createPostStateStore,
    createProjectStateStore,
    registerPostFormState
} from "@/store/register/RegisterPostStateStore";
import PostTitle from "@/components/postRegister/PostTitle";
import ProjectName_Reg from "@/components/postRegister/ProjectName_Reg";
import ProjectSubject_Reg from "@/components/postRegister/ProjectSubject_Reg";
import ProjectRecruitPosition from "@/components/postRegister/ProjectRecruitPosition";
import ProjectDate_Reg from "@/components/postRegister/ProjectDate_Reg";
import ProjectTech from "@/components/postRegister/ProjectTech";
import ProjectOwnerContact from "@/components/postRegister/ProjectOwnerContact";
import ProjectIntro from "@/components/postRegister/ProjectIntro";
import Button from "@/components/ui/Button";

function RegisterPage() {
    const router = useRouter();
    const {createPost, isCreating} = useCreatePost();
    const resetPostFormState = useResetRecoilState(createPostStateStore);
    const resetProjectFormState = useResetRecoilState(createProjectStateStore);
    const registerForm = useRecoilValue(registerPostFormState);

    useEffect(() => {
        return () => {
            resetPostFormState();
            resetProjectFormState();
        }
    }, [resetPostFormState, resetProjectFormState]);

    return (
        <div
            role='form'
            aria-label='게시글 및 프로젝트 생성'
            className="p-5 mobile:p-1 space-y-12 mobile:space-y-3 mb-8">
            <div className="w-full mobile:w-[300px] h-[80px] mx-auto ">
                <PostTitle/>
            </div>
            <div className="grid pc:grid-cols-2 tablet:grid-cols-1 gap-y-10 place-content-between mobile:place-content-center">
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <ProjectName_Reg/>
                </div>
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto pc:place-self-center">
                    <ProjectSubject_Reg/>
                </div>
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <ProjectRecruitPosition/>
                </div>
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto row-span-2 pc:place-self-center">
                    <ProjectDate_Reg/>
                </div>
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <ProjectTech/>
                </div>
                <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
                    <ProjectOwnerContact/>
                </div>
            </div>
            <div className="mobile:w-[300px] mx-auto">
                <ProjectIntro/>
            </div>
            <div className="mobile:w-[300px] space-x-2 text-center">
                <Button
                    theme="primary-hollow"
                    onClickHandler={() => router.push("/")}
                >
                    취소
                </Button>
                <Button
                    disabled={isCreating}
                    onClickHandler={() => createPost(registerForm)}
                >
                    등록
                </Button>
            </div>
        </div>
    )
}

export default RegisterPage;