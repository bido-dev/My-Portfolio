"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  fallbackLetter: string;
}

export default function ProjectHeroImage({ src, alt, fallbackLetter }: Props) {
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative w-full h-56 sm:h-80 rounded-2xl overflow-hidden bg-purple-mid/20 border border-white/10 mb-8">
      {!errored && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-contain p-10 sm:p-16"
          priority
          onError={() => setErrored(true)}
        />
      )}
      {errored && (
        <div className="absolute inset-0 flex items-center justify-center text-white/10 text-7xl font-bold select-none">
          {fallbackLetter}
        </div>
      )}
    </div>
  );
}
