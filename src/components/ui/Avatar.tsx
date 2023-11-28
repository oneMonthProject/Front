'use client';
import { makeImageSize } from "@/utils/common";
import Image, {StaticImageData} from "next/image";

interface ImageProps {
  src?: StaticImageData | string | null;
  size: string;
  alt: string;
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