'use client';

import React, {useEffect, useState} from 'react';
import {useMediaQuery} from "react-responsive";
import {MilestoneCardSkeleton} from "@/components/ui/skeleton/project/index";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import BadgeStyleSkeleton from "@/components/ui/skeleton/BadgeStyleSkeleton";

function ProjectMilestoneSkeleton() {
    return (
        <>
            <BadgeStyleSkeleton className='tablet:w-[135px] tablet:h-[36px] mb-4'/>
            <Skeleton sizeClassName='w-full h-[220px]'/>
        </>
    );
}

export default ProjectMilestoneSkeleton;