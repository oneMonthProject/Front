import React, {ReactNode} from 'react';
import BackNav from "@/components/ui/BackNav";
import ProjectInfo from "@/components/project/layout/ProjectInfo";
import ProjectNavTab from "@/components/project/layout/ProjectNavTab";

// Todo - 홈 버튼, 상단 프로젝트 정보, 업무/크루정보/알림/투표 nav탭 // 후에 projectid 받아서 렌더링해야함.
interface ProjectLayoutProps {
    children: ReactNode;
}

function ProjectLayout({children}: ProjectLayoutProps) {
    return (
        <section className='flex-col justify-center mx-auto tablet:mt-[2rem] tablet:pt-[1.5rem] px-[1.5rem] pb-[5rem]'>
            <section className='w-fit translate-x-[-50%]'>
                <BackNav to='/'/>
            </section>
            <ProjectInfo/>
            <ProjectNavTab/>
            {children}
        </section>
    );
}

export default ProjectLayout;