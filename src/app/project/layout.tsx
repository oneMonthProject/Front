import React, {ReactNode, Suspense} from 'react';
import BackNav from "@/components/ui/BackNav";
import ProjectInfo from "@/components/project/layout/ProjectInfo";
import ProjectNavTab from "@/components/project/layout/ProjectNavTab";
import HydratedProjectInfo from "@/components/project/hydrations/HydratedProjectInfo";
import {getCookie} from "cookies-next";
import {cookies} from "next/headers";

// Todo - 홈 버튼, 상단 프로젝트 정보, 업무/크루정보/알림/투표 nav탭 // 후에 projectid 받아서 렌더링해야함.
interface ProjectLayoutProps {
    children: ReactNode;
}

function ProjectLayout({children}: ProjectLayoutProps) {
    const accessToken = getCookie('accessToken',{cookies});
    console.log("accessToke: ",accessToken);
    if(!accessToken){
        // todo - 돌려보내기...
        return null;
    }
    return (
        <HydratedProjectInfo accessToken={accessToken}>
            <section
                className='flex-col justify-center mx-auto tablet:mt-[2rem] tablet:pt-[1.5rem] tablet:px-[1.5rem] pb-[5rem]'>
                <section className='w-fit tablet:translate-x-[-50%] mobile:translate-x-[-20%]'>
                    <BackNav to='/'/>
                </section>
                <ProjectInfo/>
                <Suspense fallback={<div>로딩중</div>}>
                    <ProjectNavTab/>
                    {children}
                </Suspense>
            </section>
        </HydratedProjectInfo>
    );
}

export default ProjectLayout;