"use client";
import React from "react";
import { makeBadgeSize } from "@/utils/common";
import {BadgeProps} from "@/utils/type";


function PositionBadge({ size = '', text = '' }: BadgeProps) {
  const { textSize, px, py } = makeBadgeSize(size);
  return (
    <span
      className={`inline-flex min-w-fit items-center rounded-full bg-[#F2F4F8] text-[#4A5E75] font-medium ${textSize} ${px} ${py}`}
    >
      {text}
    </span>
  );
}

export default PositionBadge;
