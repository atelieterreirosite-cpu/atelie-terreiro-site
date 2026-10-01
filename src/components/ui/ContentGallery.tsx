"use client";

import Image from "next/image";
import { useState } from "react";

import { MediaLightbox } from "@/components/ui/MediaLightbox";
import type { ImageAsset } from "@/types/views";

interface ContentGalleryProps {
  images: ImageAsset[];
  label?: string;
  className?: string;
  /**
   * grid — miniaturas com lightbox (padrão; portfólio/arquivo/etc.)
   * stack — imagens grandes em sequência vertical, sem lightbox (eventos/cursos)
   */
  layout?: "grid" | "stack";
}

function ImageMeta({ image }: { image: ImageAsset }) {
  if (!image.caption && !image.credit) return null;

  return (
    <figcaption className="mt-3 space-y-1 text-xs leading-relaxed text-muted-light">
      {image.caption ? <p>{image.caption}</p> : null}
      {image.credit ? <p>{image.credit}</p> : null}
    </figcaption>
  );
}

function StackGallery({
  images,
  label,
  className,
}: {
  images: ImageAsset[];
  label: string;
  className: string;
}) {
  return (
    <section className={`space-y-6 ${className}`.trim()} aria-label={label}>
      <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Galeria</h2>

      <ul className="flex flex-col">
        {images.map((image, index) => {
          const width = image.width && image.width > 0 ? image.width : 1600;
          const height = image.height && image.height > 0 ? image.height : 1200;

          return (
            <li
              key={`${image.src}-${index}`}
              className={
                index > 0 ? "mt-10 border-t border-border pt-10 md:mt-12 md:pt-12" : ""
              }
            >
              <figure className="min-w-0">
                <div className="flex w-full items-center justify-center overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={width}
                    height={height}
                    sizes="(max-width: 896px) 100vw, 896px"
                    className="h-auto w-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <ImageMeta image={image} />
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function ContentGallery({
  images,
  label = "Galeria",
  className = "",
  layout = "grid",
}: ContentGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  if (layout === "stack") {
    return <StackGallery images={images} label={label} className={className} />;
  }

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
