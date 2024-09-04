'use client';
import React, {useEffect} from "react";
import Button from "@/components/ui/Button";
import {useRecoilValue, useResetRecoilState} from "recoil";
import PostTitle from "@/components/postDetail/register/PostTitle";
import ProjectName_Reg from "@/components/postDetail/register/ProjectName_Reg";
import ProjectSubject_Reg from "@/components/postDetail/register/ProjectSubject_Reg";
import ProjectRecruitPosition from "@/components/postDetail/register/ProjectRecruitPosition";
import ProjectDate_Reg from "@/components/postDetail/register/ProjectDate_Reg";
import ProjectTech from "@/components/postDetail/register/ProjectTech";
import ProjectOwnerContact from "@/components/postDetail/register/ProjectOwnerContact";
import ProjectIntro from "@/components/postDetail/register/ProjectIntro";
import {
    createPostStateStore,
    createProjectStateStore,
    registerPostFormState
} from "@/store/register/RegisterPostStateStore";
import useCreatePost from "@/hooks/useCreatePost";
import {useRouter} from "next/navigation";

function RegisterForm() {
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
    },[resetPostFormState, resetProjectFormState]);

    return (
        <div className="w-full max-w-[800px] mobile:max-w-[400px] mx-auto space-y-5 mobile:space-y-3 my-8 mobile:my-6">
            <div className="w-full mobile:w-[300px] mx-auto">
                <PostTitle/>
            </div>
            <div className="flex mobile:block pc:space-x-8 tablet:space-x-8 mobile:space-y-3">
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <ProjectName_Reg/>
                    <ProjectSubject_Reg/>
                    <ProjectRecruitPosition/>
                </div>
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <ProjectDate_Reg/>
                    <ProjectTech/>
                    <ProjectOwnerContact/>
                </div>
            </div>
            <div className="mobile:w-[300px] mx-auto">
                <ProjectIntro/>
            </div>
            <div className="mobile:w-[300px] space-x-1 text-right">
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

export default RegisterForm;