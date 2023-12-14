'use client';
import React, {ReactNode} from 'react';
import Button from "@/components/ui/Button";
import Link from "next/link";
import {useQueryString} from "@/hooks/useQueryString";

function ProjectCrewDetailPageLayout({children}: { children: ReactNode }) {
    const projectId = useQueryString('projectId');
    return (
        <section className='w-full flex flex-col items-center'>
            <section className='w-full px-1'>
                {children}
            </section>
            <section className='mt-7'>
                <Link href={{
                    pathname: '/project/crews',
                    query:{projectId}
                }}>
                    <Button size='xl' theme='primary-hollow'>
                        크루 목록
                    </Button>
                </Link>
            </section>
        </section>
    );
}

export default ProjectCrewDetailPageLayout;