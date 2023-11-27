"use client";
import React from "react";
import { makeBadgeColor, makeBadgeSize } from "@/utils/common";
import {BadgeProps} from "@/utils/type";



function TrustGradeBadge({ color = '', size = '', text = '' }: BadgeProps) {
  // 사이즈
  const { textSize, px, py } = makeBadgeSize(size);

  // 색상
  const { bgColor, textColor, ringColor } = makeBadgeColor(color);

  return (
    <>
      <span
        className={`inline-flex items-center rounded-full ${bgColor} ${px} ${py} ${textSize} font-medium ${textColor} ring-1 ring-inset ${ringColor}`}
      >
        {text}
      </span>
    </>
  );
}

export default TrustGradeBadge;
