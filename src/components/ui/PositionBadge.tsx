"use client";
import React from "react";
import { makeBadgeSize } from "@/utils/common";

interface PositionBadgeProps {
  size: string;
  text: string;
}

function PositionBadge({ size, text }: PositionBadgeProps) {
  const { textSize, px, py } = makeBadgeSize(size);
  return (
    <span
      className={`inline-flex items-center rounded-full bg-[#F2F4F8] text-[#4A5E75] font-medium ${textSize} ${px} ${py}`}
    >
      {text}
    </span>
  );
}

export default PositionBadge;
