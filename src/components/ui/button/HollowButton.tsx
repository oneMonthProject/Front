import React from 'react';
import {ButtonProps} from "@/components/ui/button/Button";


function HollowButton({size, children, ...props}:ButtonProps) {
    const css = size === 'sm' ? 'px-3 py-1 text-sm' : 'px-6 py-2 text-base'
    return (
        <button
            {...props}
            className={`${css} transition ease-in duration-200 uppercase rounded-full hover:bg-secondary text-black100 hover:text-white hover:border-secondary border-2 border-black100  focus:outline-none`}
        >
            {children}
        </button>
    );
}

export default HollowButton;