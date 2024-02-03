import React from 'react';

function Loader({size}:{size:number}){
    const dimensions = `w-${size} h-${size}`;

    return (
        <div className={
            `m-auto ease-linear rounded-full border-t-[6px] border-t-blue-500 border-[6px] border-solid 
            ${dimensions} animate-spin`
        }></div>
    );
}

export default Loader;