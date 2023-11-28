"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonTheme =
  | "primary"
  | "primary-hollow"
  | "disabled"
  | "disabled-hollow"
  | "cancel"
  | "black"
  | "black-hollow";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export function makeButtonSize(size: ButtonSize) {
  let textSize;
  let px;
  let py;

  switch (size) {
    case "sm":
      textSize = "mobile:text-xs tablet:text-sm";
      px = "mobile:px-2.5 tablet:px-3";
      py = "mobile:py-1 tablet:py-1";
      break;
    case "md":
      textSize = "mobile:text-sm tablet:text-md";
      px = "mobile:px-3 tablet:px-3.5";
      py = "mobile:py-1 tablet:py-1.5";
      break;
    case "lg":
      textSize = "mobile:text-lg tablet:text-xl";
      px = "mobile:px-3.5 tablet:px-5";
      py = "mobile:py-1.5 tablet:py-2";
      break;
    case "xl":
      textSize = "mobile:text-lg tablet:text-xl";
      px = "mobile:px-4 tablet:px-6";
      py = "mobile:py-2 tablet:py-3";
      break;
    default:
      textSize = "text-sm";
      px = "mobile:px-2.5 tablet:px-3.5";
      py = "mobile:py-1 tablet:py-1.5";
  }

  return { textSize, px, py };
}

export function makeButtonColor(theme: ButtonTheme) {
  let bgColor = "";
  let textColor = "";
  let ring = "";

  switch (theme) {
    case "primary":
      bgColor = "bg-primary";
      textColor = "text-white";
      break;
    case "primary-hollow":
      bgColor = "bg-white";
      textColor = "text-primary";
      ring = "ring-1 ring-inset ring-primary";
      break;
    case "cancel":
      bgColor = "bg-grey200";
      textColor = "text-black100";
      break;
    case "black":
      bgColor = "bg-black";
      textColor = "text-white";
      break;
    case "black-hollow":
      bgColor = "bg-white";
      textColor = "text-black100";
      ring = "ring-1 ring-inset ring-black100";
      break;
    case "disabled":
      bgColor = "bg-grey500";
      textColor = "text-white";
      break;
    case "disabled-hollow":
      bgColor = "bg-white";
      textColor = "text-grey500";
      ring = "ring-1 ring-inset ring-grey500";
      break;
    default:
      bgColor = "bg-primary";
      textColor = "text-white";
  }

  return { bgColor, textColor, ring };
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  theme?: ButtonTheme;
  children: ReactNode;
  onClickHandler?: () => void;
}

function Button({
  size = "md",
  theme = "primary",
  children,
  onClickHandler,
  ...props
}: ButtonProps) {
  const { textSize, px, py } = makeButtonSize(size);
  const { bgColor, textColor, ring } = makeButtonColor(theme);

  return (
    <button
      {...props}
      className={`rounded-full ${bgColor} ${px} ${py} ${textSize} font-semibold ${textColor} shadow-sm ${ring}`}
      onClick={ () => {
        if(typeof onClickHandler === 'function') onClickHandler();
      }}
    >
      {children}
    </button>
  );
}

export default Button;
