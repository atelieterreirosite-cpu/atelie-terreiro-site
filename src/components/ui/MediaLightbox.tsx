"use client";

import Image from "next/image";
import { useId, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

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

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const previousScrollRef = useRef(0);
  const mounted = useIsClient();
  const hasMeta = Boolean(title || description);

  useLayoutEffect(() => {
    if (!open || !mounted) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previousScrollRef.current = window.scrollY;

    const frame = window.requestAnimationFrame(() => {
      dialogRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
      closeRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
      window.scrollTo({ top: previousScrollRef.current, behavior: "auto" });
      previousFocusRef.current?.focus();
    };
  }, [open, mounted, onClose]);

  if (!open || !mounted) return null;

  const headingId = labelledBy ?? (title ? titleId : undefined);

  return createPortal(
    <>
      <button
        type="button"
        className="fixed inset-0 z-[100] cursor-default bg-[var(--overlay)]"
        aria-label="Fechar visualização"
        onClick={onClose}
      />

      {/*
        Card no fluxo do documento (portal no body): a página rola
        junto com ele. Sem overflow:hidden no body.
      */}
      <div
        ref={dialogRef}
        className="relative z-[101] mx-auto mb-20 w-full max-w-3xl scroll-mt-4 px-3 sm:px-5"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          aria-label={headingId ? undefined : image.alt || "Imagem ampliada"}
          className="bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
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
    </>,
    document.body,
  );
}
