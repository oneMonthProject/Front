'use client';

import React, {useEffect, useState} from 'react';
import {useMediaQuery} from "react-responsive";
import {MilestoneCardSkeleton} from "@/components/ui/skeleton/project/index";

function ProjectMilestoneSkeleton() {
    const [isMobile, setIsMobile] = useState(false);

    const mobile = useMediaQuery({ maxWidth: 700 });

    useEffect(() => {
        setIsMobile(mobile);
    }, [mobile, isMobile]);

    const cardCount = isMobile ? 1 : 4;

    return (
        <div className='w-full flex items-center '>
            {
                new Array(cardCount).map((v,index) => (<MilestoneCardSkeleton key={index}/>))
            }
        </div>
    );
}

export default ProjectMilestoneSkeleton;