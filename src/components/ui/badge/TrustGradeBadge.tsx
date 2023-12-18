"use client";
import React from "react";
import {makeBadgeColor, makeBadgeSize} from "@/utils/common";
import {BadgeProps} from "@/utils/type";


function TrustGradeBadge({size = '', text = ''}: BadgeProps) {
    // 사이즈
    const {textSize, px, py} = makeBadgeSize(size);

    let badgeColor = "";
    switch (text) {
        case '1등급':
            badgeColor = 'red';
            break;
        case '2등급':
            badgeColor = 'yellow';
            break;
        case '3등급':
            badgeColor = 'green';
            break;
        case '4등급':
            badgeColor = 'blue';
            break;
        default:
            throw Error('Unknown trust grade');
    }

    // 색상
    const {bgColor, textColor, ringColor} = makeBadgeColor(badgeColor);

    return (
        <>
            <span className='sr-only'>{text}</span>
            <span
                aria-hidden={true}
                className={`inline-flex items-center rounded-full ${bgColor} ${px} ${py} ${textSize} font-medium ${textColor} ring-1 ring-inset ${ringColor}`}>
                {text}
            </span>
        </>
    );
}

export default TrustGradeBadge;
