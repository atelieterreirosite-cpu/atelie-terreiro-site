"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";

import { EditorialText } from "@/components/ui/EditorialText";
import type { ImageAsset } from "@/types/views";

interface MediaLightboxProps {
  open: boolean;
  onClose: () => void;
  image: ImageAsset;
  title?: string;
  description?: string;
  labelledBy?: string;
}

export function MediaLightbox({
  open,
  onClose,
  image,
  title,
  description,
  labelledBy,
}: MediaLightboxProps) {
  const titleId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const hasMeta = Boolean(title || description);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarGap > 0) {
      document.body.style.paddingRight = `${scrollbarGap}px`;
    }

    scrollRef.current?.scrollTo({ top: 0 });
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const headingId = labelledBy ?? (title ? titleId : undefined);

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--overlay)]" role="presentation">
      {/*
        Body fica travado; esta camada rola. Assim o card nunca fica
        cortado fora da viewport — dá para ver o modal por completo.
      */}
      <div
        ref={scrollRef}
        className="absolute inset-0 overflow-y-auto overscroll-contain p-3 sm:p-5 md:p-8"
        onClick={onClose}
      >
        <div
          className="flex min-h-full justify-center py-2"
          style={{ alignItems: "safe center" }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            aria-label={headingId ? undefined : image.alt || "Imagem ampliada"}
            className="relative w-full max-w-3xl bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-end border-b border-border px-4 py-3 sm:px-5">
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="touch-target inline-flex items-center justify-center text-xs tracking-[0.14em] text-muted uppercase transition-colors duration-300 hover:text-foreground motion-reduce:transition-none"
                aria-label="Fechar"
              >
                Fechar ✕
              </button>
            </div>

            <div className="flex items-center justify-center bg-accent/5 px-4 py-5 sm:px-6 sm:py-6">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width ?? 1600}
                height={image.height ?? 1200}
                sizes="(max-width: 768px) 100vw, 768px"
                className="h-auto w-auto max-w-full object-contain"
                style={{
                  maxHeight: hasMeta
                    ? "min(52dvh, 480px)"
                    : "min(78dvh, 720px)",
                }}
                priority
              />
            </div>

            {hasMeta ? (
              <div className="space-y-3 border-t border-border px-5 py-5 sm:px-8 sm:py-6">
                {title ? (
                  <h2
                    id={titleId}
                    className="font-display text-xl leading-snug font-light tracking-wide text-foreground sm:text-2xl"
                  >
                    {title}
                  </h2>
                ) : null}
                {description ? (
                  <EditorialText
                    text={description}
                    className="text-sm leading-relaxed text-muted sm:text-base"
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
