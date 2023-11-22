'use client';
import Image from "next/image";

interface ImageProps {
  src: string | null;
  size: string;
  alt: string;
}

function makeImageSize(size: string) {
  let imageSize;
  switch (size) {
    case 'xs':
      imageSize = 'h-10 w-10';
      break;
    case 'sm':
      imageSize = 'h-16 w-16 mobile:h-10 mobile:w-10';
      break;
    case 'md':
      imageSize = 'h-24 w-24 mobile:h-16 mobile:w-16';
      break;
    case 'lg':
      imageSize = 'h-40 w-40 mobile:h-32 mobile:w-32';
      break;
    default:
      imageSize = 'h-32 w-32';
  }

  return imageSize;
}

function Avatar({ src, size, alt }: ImageProps) {
  const imageSize = makeImageSize(size);

  return (
    src ? (
      <span className={`${imageSize} relative inline-block overflow-hidden rounded-full ring-2 ring-white`}>
        <Image src={src} alt={alt} fill />
      </span>
    ) : (
      <span className={`${imageSize} relative inline-block overflow-hidden rounded-full bg-gray-100 ring-2 ring-white`}>
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
    )
  );
}

export default Avatar;