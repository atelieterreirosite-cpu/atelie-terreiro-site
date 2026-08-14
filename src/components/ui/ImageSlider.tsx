"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { ImageAsset } from "@/types/views";

interface ImageSliderProps {
  images: ImageAsset[];
  label?: string;
  className?: string;
}

export function ImageSlider({
  images,
  label = "Galeria de imagens",
  className = "",
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const total = images.length;

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      setCurrentIndex(((index % total) + total) % total);
    },
    [total],
  );

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  useEffect(() => {
    if (total <= 1 || isPaused || prefersReducedMotion) return;

    const timer = window.setInterval(goNext, 6000);
    return () => window.clearInterval(timer);
  }, [goNext, isPaused, prefersReducedMotion, total]);

  if (total === 0) {
    return null;
  }

  const current = images[currentIndex];

  return (
    <section
      className={`relative w-full overflow-hidden bg-accent ${className}`}
      aria-roledescription="carrossel"
      aria-label={label}
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goPrev();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goNext();
        }
      }}
      onTouchStart={(event) => setTouchStartX(event.touches[0]?.clientX ?? null)}
      onTouchEnd={(event) => {
        if (touchStartX === null) return;
        const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
        const delta = touchStartX - touchEndX;
        if (Math.abs(delta) > 48) {
          if (delta > 0) goNext();
          else goPrev();
        }
        setTouchStartX(null);
      }}
    >
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] md:aspect-[21/9] md:max-h-[70vh]">
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"
          aria-hidden="true"
        />
      </div>

      {current.caption ? (
        <>
          <p className="border-b border-border bg-surface px-6 py-3 text-xs leading-relaxed text-muted md:hidden">
            {current.caption}
          </p>
          <p className="absolute bottom-16 left-6 hidden text-xs text-white/80 md:right-24 md:block md:max-w-xl">
            {current.caption}
          </p>
        </>
      ) : null}

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="touch-target absolute top-1/2 left-2 z-10 flex -translate-y-1/2 items-center justify-center text-white/80 transition-colors duration-300 hover:text-white sm:left-4"
            aria-label="Imagem anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          <button
            type="button"
            onClick={goNext}
            className="touch-target absolute top-1/2 right-2 z-10 flex -translate-y-1/2 items-center justify-center text-white/80 transition-colors duration-300 hover:text-white sm:right-4"
            aria-label="Próxima imagem"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          <div
            className="absolute bottom-4 left-1/2 z-10 flex max-w-[90%] -translate-x-1/2 gap-2 sm:bottom-6"
            role="tablist"
            aria-label="Selecionar imagem"
          >
            {images.map((image, index) => (
              <button
                key={`dot-${image.src}-${index}`}
                type="button"
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Imagem ${index + 1} de ${total}`}
                onClick={() => goTo(index)}
                className="flex items-center justify-center p-1.5"
              >
                <span
                  className={`block rounded-full transition-all duration-300 motion-reduce:transition-none ${
                    index === currentIndex
                      ? "h-1.5 w-8 bg-white"
                      : "h-1.5 w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </>
      ) : null}

      <p className="sr-only" aria-live="polite">
        Imagem {currentIndex + 1} de {total}: {current.alt}
      </p>
    </section>
  );
}
