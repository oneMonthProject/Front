"use client";
import React, {HTMLAttributes} from "react";
import {BadgeProps} from "@/utils/type";
import {FaRegSmile} from "@react-icons/all-files/fa/FaRegSmile";
import {TrustGradeNameType} from "@/app/project/@setting/_utils/type";
import {useMediaQuery} from "react-responsive";
import {classNames} from "@/utils/common";


interface TrustBradeBadgeProps extends BadgeProps, HTMLAttributes<SVGElement> {
    text: TrustGradeNameType;
}

function TrustGradeBadge({text, ...props}: TrustBradeBadgeProps) {
    const isDesktop = useMediaQuery({query: '(min-width: 1280px)'});

    let textColor = "";

    switch (text) {
        case "level1":
            textColor = "text-level1";
            break;
        case "level2":
            textColor = "text-level2";
            break;
        case "level3":
            textColor = "text-level3";
            break;
        case "level4":
            textColor = "text-level4";
            break;
    }

    const size = isDesktop ? 22 : 18;

    return (
        <>
            <span className='sr-only'>프로젝트 신뢰 등급: {text}</span>
            <FaRegSmile
                className={
                    classNames(`rounded-full ${textColor}`, props.className ? props.className : '')
                }
                size={size}/>
        </>
    );
}

export default TrustGradeBadge;
