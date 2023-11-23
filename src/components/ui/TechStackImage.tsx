import React from 'react';
import Image from "next/image";

function TechStackImage({stackName}:{stackName:string}) {
    return (
        <Image
            src={`/images/${stackName.toLowerCase()}.svg`}
            alt={stackName}
            width={30}
            height={30}
        />
    );
}

export default TechStackImage;