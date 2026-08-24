"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { GuideView } from "@/types/views";

interface TeamNetworkProps {
  kicker: string;
  title: string;
  text: string;
  members: GuideView[];
}

/** Frame único: ~1,5–2 retratos no mobile; faixa editorial no desktop. */
const PORTRAIT_FRAME =
  "w-[58vw] max-w-[16.5rem] sm:w-[42vw] sm:max-w-[15rem] md:w-[15rem] md:max-w-none lg:w-[16.5rem]";

export function TeamNetwork({ kicker, title, text, members }: TeamNetworkProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ active: boolean; startX: number; scrollLeft: number }>({
    active: false,
    startX: 0,
    scrollLeft: 0,
  });
  const [dragging, setDragging] = useState(false);

  const scrollByAmount = useCallback((direction: 1 | -1) => {
    const node = scrollerRef.current;
    if (!node) return;
    const step = Math.min(320, Math.max(180, node.clientWidth * 0.45));
    node.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  if (members.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="equipe-rede-title"
      className="border-t border-border pb-20 md:pb-28"
    >
      <div className="mx-auto max-w-7xl px-6 pt-16 md:px-10 md:pt-24 lg:pt-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-xl space-y-5">
            <p className="text-xs tracking-[0.15em] text-muted-light uppercase">{kicker}</p>
            <h2
              id="equipe-rede-title"
              className="font-display text-3xl leading-tight font-light tracking-wide sm:text-4xl md:text-5xl"
            >
              {title}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">{text}</p>
          </div>

          <p
            className="hidden text-xs tracking-[0.15em] text-muted-light uppercase lg:block lg:pb-1"
            aria-hidden="true"
          >
            arraste →
          </p>
        </div>
      </div>

      <div
        ref={scrollerRef}
        role="region"
        aria-label="Galeria horizontal da rede do Ateliê"
        tabIndex={0}
        className={`mt-12 touch-pan-x overflow-x-auto overscroll-x-contain pb-4 outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-4 focus-visible:ring-offset-background md:mt-16 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollByAmount(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollByAmount(-1);
          }
        }}
        onPointerDown={(event) => {
          const node = scrollerRef.current;
          if (!node || event.pointerType === "touch") return;
          dragState.current = {
            active: true,
            startX: event.clientX,
            scrollLeft: node.scrollLeft,
          };
          setDragging(true);
          node.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const node = scrollerRef.current;
          if (!node || !dragState.current.active) return;
          const delta = event.clientX - dragState.current.startX;
          node.scrollLeft = dragState.current.scrollLeft - delta;
        }}
        onPointerUp={(event) => {
          const node = scrollerRef.current;
          dragState.current.active = false;
          setDragging(false);
          if (node?.hasPointerCapture(event.pointerId)) {
            node.releasePointerCapture(event.pointerId);
          }
        }}
        onPointerCancel={() => {
          dragState.current.active = false;
          setDragging(false);
        }}
      >
        <ul className="flex w-max items-start gap-5 pl-[max(1rem,calc((100vw-80rem)/2+1rem))] pr-6 sm:gap-6 md:gap-8 md:pl-[max(1.75rem,calc((100vw-80rem)/2+1.75rem))] md:pr-10 lg:gap-10 lg:pr-[18vw]">
          {members.map((member) => {
            const imageSrc = member.image?.src?.trim();
            const imageAlt = member.image?.alt?.trim() || member.name;

            return (
              <li key={member.slug || String(member.id)} className={`shrink-0 ${PORTRAIT_FRAME}`}>
                <figure className="space-y-3">
                  <div className="relative aspect-[3/4] overflow-hidden bg-accent/5 select-none">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 768px) 58vw, (max-width: 1024px) 15rem, 16.5rem"
                        className="pointer-events-none object-cover"
                        draggable={false}
                      />
                    ) : (
                      <MediaPlaceholder
                        label={member.name}
                        className="absolute inset-0 aspect-auto h-full min-h-full"
                      />
                    )}
                  </div>
                  <figcaption className="font-display text-lg leading-snug font-light tracking-wide text-foreground/90 sm:text-xl">
                    {member.name}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl items-center justify-between gap-4 px-6 md:px-10 lg:hidden">
        <p className="text-xs tracking-[0.12em] text-muted-light uppercase">Deslize para ver mais</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="touch-target text-xs tracking-[0.12em] text-muted uppercase transition-colors duration-300 hover:text-foreground motion-reduce:transition-none"
            aria-label="Ver pessoas anteriores"
            onClick={() => scrollByAmount(-1)}
          >
            ←
          </button>
          <button
            type="button"
            className="touch-target text-xs tracking-[0.12em] text-muted uppercase transition-colors duration-300 hover:text-foreground motion-reduce:transition-none"
            aria-label="Ver próximas pessoas"
            onClick={() => scrollByAmount(1)}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
