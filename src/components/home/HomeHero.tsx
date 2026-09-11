"use client";

import { useEffect, useState } from "react";

import { VimeoBackgroundPlayer } from "@/components/ui/VimeoBackgroundPlayer";
import { YouTubeBackgroundPlayer } from "@/components/ui/YouTubeBackgroundPlayer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { HomeVideo } from "@/types/views";

interface HomeHeroProps {
  video?: HomeVideo;
}

/** Faixa rolável extra abaixo do vídeo em telas mais largas que 16:9 */
const SCROLL_BUFFER_VH = 22;

function buildWatchUrl(video: HomeVideo): string | null {
  if (video.provider === "youtube" && video.videoId) {
    const url = new URL(`https://www.youtube.com/watch?v=${video.videoId}`);
    if (video.startSeconds) {
      url.searchParams.set("t", String(video.startSeconds));
    }
    return url.toString();
  }

  if (video.provider === "vimeo" && video.videoId) {
    return `https://vimeo.com/${video.videoId}`;
  }

  if (video.provider === "file") {
    return video.url ?? null;
  }

  return video.url ?? null;
}

function useWideViewport(): boolean {
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-aspect-ratio: 16/9)");

    const update = () => setIsWide(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isWide;
}

function ReducedMotionFallback({ video }: { video: HomeVideo }) {
  const watchUrl = buildWatchUrl(video);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-accent px-6">
      <div className="max-w-md space-y-6 text-center">
        <p className="font-display text-2xl font-light tracking-wide text-white md:text-3xl">
          {video.title}
        </p>
        <p className="text-sm leading-relaxed text-white/80">{video.description}</p>
        {watchUrl ? (
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-block text-sm tracking-[0.12em] text-white uppercase"
          >
            Assistir vídeo →
          </a>
        ) : null}
      </div>
    </div>
  );
}

function HomeVideoLayer({ video, fit }: { video: HomeVideo; fit: "fill" | "width" }) {
  if (video.provider === "youtube" && video.videoId) {
    return <YouTubeBackgroundPlayer video={video} fit={fit} />;
  }

  if (video.provider === "file" && video.url) {
    return (
      <video
        className={`absolute inset-0 h-full w-full object-cover ${fit === "width" ? "h-[56.25vw]" : ""}`}
        src={video.url}
        autoPlay
        muted
        loop
        playsInline
        aria-label={video.title}
      />
    );
  }

  if (video.provider === "vimeo" && video.videoId) {
    return <VimeoBackgroundPlayer video={video} fit={fit} />;
  }

  return (
    <div
      className="absolute inset-0 bg-accent"
      role="img"
      aria-label={video.title}
    />
  );
}

export function HomeHero({ video }: HomeHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isWide = useWideViewport();
  const scrollableHeight = `max(100dvh, calc(56.25vw + ${SCROLL_BUFFER_VH}vh))`;
  const label = video?.title || "Início";

  // Em viewports mais estreitos/altos (celular, iPad), a largura manda:
  // vídeo 16:9 em 100% da largura, sem crop por altura fixa (100dvh + cover).
  // Em desktop largo (aspect ≥ 16/9), mantém a composição atual com buffer rolável.
  const sectionClassName = isWide
    ? "relative w-full bg-black"
    : "relative aspect-video w-full bg-black";

  return (
    <section
      id="conteudo-principal"
      className={sectionClassName}
      style={isWide ? { minHeight: scrollableHeight } : undefined}
      aria-label={label}
    >
      {video && prefersReducedMotion ? (
        <ReducedMotionFallback video={video} />
      ) : video ? (
        <>
          <HomeVideoLayer video={video} fit="width" />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[56.25vw] bg-gradient-to-t from-black/30 via-transparent to-black/20"
            aria-hidden="true"
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-accent" aria-hidden="true" />
      )}

      {video?.description ? <p className="sr-only">{video.description}</p> : null}
    </section>
  );
}
