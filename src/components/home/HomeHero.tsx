"use client";

import { VimeoBackgroundPlayer } from "@/components/ui/VimeoBackgroundPlayer";
import { YouTubeBackgroundPlayer } from "@/components/ui/YouTubeBackgroundPlayer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { HomeVideo } from "@/types/views";

interface HomeHeroProps {
  video?: HomeVideo;
}

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

function HomeVideoLayer({ video }: { video: HomeVideo }) {
  if (video.provider === "youtube" && video.videoId) {
    return <YouTubeBackgroundPlayer video={video} fit="fill" />;
  }

  if (video.provider === "file" && video.url) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
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
    return <VimeoBackgroundPlayer video={video} fit="fill" />;
  }

  return (
    <div
      className="absolute inset-0 bg-accent"
      role="img"
      aria-label={video.title}
    />
  );
}

/**
 * Altura da seção = max(100dvh, 56.25vw):
 * - viewport mais alto que 16:9 → preenche a tela (vídeo em cover, laterais podem ser cortadas)
 * - viewport mais largo que 16:9 → seção acompanha a altura 16:9 do vídeo; a página rola para ver o excedente
 */
export function HomeHero({ video }: HomeHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const label = video?.title || "Início";

  return (
    <section
      id="conteudo-principal"
      className="relative w-full bg-black"
      style={{ height: "max(100dvh, 56.25vw)" }}
      aria-label={label}
    >
      {video && prefersReducedMotion ? (
        <ReducedMotionFallback video={video} />
      ) : video ? (
        <>
          <HomeVideoLayer video={video} />
          <div
            className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-black/30 via-transparent to-black/20"
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
