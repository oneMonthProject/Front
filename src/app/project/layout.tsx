import React from 'react';
import BackNav from "@/components/ui/BackNav";
import ProjectNavTabContents from "@/components/project/layout/ProjectNavTabContents";

export const revalidate = 0;

function ProjectLayout(
    props: {
        children: React.ReactNode
        task: React.ReactNode
        crews: React.ReactNode
        notice: React.ReactNode
        setting: React.ReactNode
    }) {
    return (
        <section
            className='flex-col justify-center mx-auto tablet:mt-[2rem] tablet:pt-[1.5rem] tablet:px-[1.5rem] pb-[5rem]'>
            <section className='w-fit tablet:translate-x-[-50%] mobile:translate-x-[-20%]'>
                <BackNav to='/'/>
            </section>
            {props.children}
            <ProjectNavTabContents
                slots={{
                    task: props.task,
                    crews: props.crews,
                    notice: props.notice,
                    setting: props.setting
                }}
            />
        </section>
    );
}

export default ProjectLayout;