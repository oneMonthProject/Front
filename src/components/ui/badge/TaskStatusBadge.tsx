import React from 'react';
import {BadgeProps} from "@/utils/type";
import {makeBadgeSize} from "@/utils/common";

function getStatusBadgeColor(text:string){
    switch(text){
        case '시작전':
            return {bgColor:'bg-grey900', textColor:'text-grey000'};
        case '진행중':
            return {bgColor:'bg-[#FFF9CF]', textColor:'text-[#7B5C03]'};
        case '완료':
            return {bgColor:'bg-[#F1F1F1]', textColor: 'text-[#242D35]'};
        default:
            throw Error("Unknown Status Type");
    }
}

function TaskStatusBadge({size = '', text = '시작전'}: BadgeProps) {

    const {textSize, px, py} = makeBadgeSize(size);

    const {bgColor, textColor} = getStatusBadgeColor(text);


    return (
        <span
            className={`inline-flex items-center rounded-full ${bgColor} ${px} ${py} ${textSize} font-medium ${textColor}`}
        >
        {text}
      </span>
    );
}

export default TaskStatusBadge;