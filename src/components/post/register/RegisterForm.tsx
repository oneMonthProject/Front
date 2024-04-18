'use client';
import React from "react";
import Button from "@/components/ui/Button";
import {useRecoilValue} from "recoil";
import PostTitle from "@/components/post/register/PostTitle";
import ProjectName_Reg from "@/components/post/register/ProjectName_Reg";
import ProjectSubject_Reg from "@/components/post/register/ProjectSubject_Reg";
import ProjectTrustGrade_Reg from "@/components/post/register/ProjectTrustGrade_Reg";
import ProjectCrewCount from "@/components/post/register/ProjectCrewCount";
import ProjectRecruitPosition from "@/components/post/register/ProjectRecruitPosition";
import ProjectDate_Reg from "@/components/post/register/ProjectDate_Reg";
import ProjectTech from "@/components/post/register/ProjectTech";
import ProjectOwnerContact from "@/components/post/register/ProjectOwnerContact";
import ProjectIntro from "@/components/post/register/ProjectIntro";
import {registerPostFormState} from "@/store/register/RegisterPostStateStore";
import useCreatePost from "@/hooks/useCreatePost";
import {useRouter} from "next/navigation";

function RegisterForm() {
    const router = useRouter();
    const {createPost, isCreating} = useCreatePost();
    const registerForm = useRecoilValue(registerPostFormState);

    return (
        <div className="w-full max-w-[800px] mobile:max-w-[400px] mx-auto space-y-5 mobile:space-y-3 my-8 mobile:my-6">
            <div className="w-full mobile:w-[300px] mx-auto">
                <PostTitle/>
            </div>
            <div className="flex mobile:block pc:space-x-8 tablet:space-x-8 mobile:space-y-3">
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <ProjectName_Reg/>
                    <ProjectSubject_Reg/>
                    <ProjectTrustGrade_Reg/>
                    <ProjectCrewCount/>
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