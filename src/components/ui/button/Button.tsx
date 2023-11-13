'use client';
import {HTMLAttributes, ReactNode} from "react";

export type ButtonSize = 'sm' | 'md';
export type ButtonTheme = 'primary' | 'secondary' | 'custom';

export interface ButtonProps extends HTMLAttributes<HTMLElement> {
    size?: ButtonSize;
    theme?: ButtonTheme;
    children: ReactNode;
    onClick: () => void;
}

export function makeButtonTheme(theme: ButtonTheme = 'custom') {
    let css = '';
    switch (theme) {
        case 'primary':
            css += 'bg-primary hover:bg-primaryDark';
            break;
        case 'secondary':
            css += 'bg-secondary hover:bg-secondaryLight';
            break;
        case 'custom':
            break;
    }
    return css;
}

export default function Button({size, theme, children, onClick,...props}: ButtonProps) {

    const css = (size === 'sm' ? 'py-1 px-2 text-sm shadow-md rounded-md ' : 'py-2 px-4 text-base shadow-md rounded-lg ')
        + makeButtonTheme(theme);

    return (
        <>
            <button
                {...props}
                className={`w-fit text-white transition ease-in duration-50 text-center font-semibold ${css}`}
                onClick={onClick}
            >
                {children}
            </button>
        </>
    )
}
