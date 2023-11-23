import React from 'react';
import Image from "next/image";

function TechStackImage({stackName}:{stackName:string}) {
    return (
        <Image
            src={`${process.env.NEXT_PUBLIC_URL}/images/tech/${stackName.toLowerCase()}.svg`}
            alt={stackName}
            fill
        />
    );
}

export default TechStackImage;