'use client';
import React from 'react';
import {makeBadgeColor, makeBadgeSize} from "@/utils/common";


type Props = {
    color: string;
    size: string;
    text: string;
};

function TrustGradeBadge({color, size, text}: Props) {
    // 사이즈
    const {textSize, px, py} = makeBadgeSize(size);

    console.log("textSize: ", textSize);

    // 색상
    const {bgColor, textColor, ringColor} = makeBadgeColor(color);

    console.log("bgColor: ", bgColor);


    return (
        <>
            <span
                className={`inline-flex items-center rounded-full ${bgColor} ${px} ${py} ${textSize} font-medium ${textColor} ring-1 ring-inset ${ringColor}`}>{text}</span>
        </>
    );
}


export default TrustGradeBadge;