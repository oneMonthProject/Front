'use client';
import React from 'react';
import {useQueryString} from "@/hooks/useQueryString";
import CrewList from "@/components/project/crews/CrewList";
import Link from "next/link";
import Button from "@/components/ui/Button";

function CrewListButton() {
    const projectId = useQueryString('projectId');
    return (
        <Link href={{
            pathname: '/project/crews',
            query:{projectId}
        }}>
            <Button size='xl' theme='primary-hollow'>
                크루 목록
            </Button>
        </Link>
    );
}

export default CrewListButton;