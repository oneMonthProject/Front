'use client';
import React from 'react';
import { makeBadgeSize } from "@/utils/common";

interface TechStackBadgeProps {
  size: string;
  text: string;
  className?: string;
}

function TechStackBadge({ size, text, className }: TechStackBadgeProps) {
  const { textSize, px, py } = makeBadgeSize(size);
  return (
    <span className={`inline-flex items-center rounded-full bg-primary text-white font-medium ${textSize} ${px} ${py} ${className}`}>{text}</span>
  );
}

export default TechStackBadge;