import React from 'react';
import Image from "next/image";

interface TechStackImageProps {
  stackName: string;
  width?: number;
  height?: number;
}

function TechStackImage({ stackName, width, height }: TechStackImageProps) {
  const fileName = stackName.toLowerCase().replace(".", "");
  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_URL}/images/tech/${fileName}.svg`}
      alt={stackName}
      fill={width && height ? undefined : true}
      width={width ? width : undefined}
      height={height ? height : undefined}
    />
  );
}

export default TechStackImage;