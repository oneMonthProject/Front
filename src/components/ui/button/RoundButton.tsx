import React from 'react';
import {ButtonProps, makeButtonTheme} from "@/components/ui/button/Button";

function RoundButton({size, theme, children}:ButtonProps) {

    const css = makeButtonTheme(theme) + (size === 'sm' ? ' py-1 px-2 text-sm shadow-md' : ' py-2 px-4 text-base shadow-md');
    return (
        <button type="button"
                className={`text-white w-transition ease-in duration-50 text-center font-semibold rounded-full ${css}`}>
            {children}
        </button>
    );
}

export default RoundButton;