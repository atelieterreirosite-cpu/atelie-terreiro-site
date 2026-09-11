"use client";

import Image from "next/image";
import { useState } from "react";

import { MediaLightbox } from "@/components/ui/MediaLightbox";
import type { ImageAsset } from "@/types/views";

interface ContentGalleryProps {
  images: ImageAsset[];
  label?: string;
  className?: string;
}

export function ContentGallery({
  images,
  label = "Galeria",
  className = "",
}: ContentGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  return (
    <section className={`space-y-6 ${className}`.trim()} aria-label={label}>
      <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Galeria</h2>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {images.map((image, index) => (
          <li key={`${image.src}-${index}`}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative block w-full overflow-hidden bg-accent/5 text-left focus-visible:outline-offset-4"
              aria-label={`Ampliar imagem ${index + 1}: ${image.alt}`}
            >
              <span className="relative block aspect-[4/3]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-opacity duration-500 motion-reduce:transition-none group-hover:opacity-90"
                  loading="lazy"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {activeImage ? (
        <MediaLightbox
          open
          image={activeImage}
          onClose={() => setActiveIndex(null)}
        />
      ) : null}
    </section>
  );
}
