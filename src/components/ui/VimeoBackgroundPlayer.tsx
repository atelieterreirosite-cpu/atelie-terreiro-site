"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { HomeVideo } from "@/types/views";

interface VimeoBackgroundPlayerProps {
  video: HomeVideo;
  /** fill — cover fullscreen; width — 16:9 pela largura */
  fit?: "fill" | "width";
  className?: string;
}

interface VimeoPlayer {
  ready: () => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  setMuted: (muted: boolean) => Promise<void>;
  getMuted: () => Promise<boolean>;
  setCurrentTime: (seconds: number) => Promise<number>;
  setVolume: (volume: number) => Promise<number>;
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback?: () => void) => void;
  destroy: () => Promise<void>;
}

declare global {
  interface Window {
    Vimeo?: {
      Player: new (
        element: HTMLIFrameElement | HTMLElement | string,
        options?: Record<string, unknown>,
      ) => VimeoPlayer;
    };
  }
}

let vimeoApiPromise: Promise<void> | null = null;

function loadVimeoApi(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.Vimeo?.Player) {
    return Promise.resolve();
  }

  if (vimeoApiPromise) {
    return vimeoApiPromise;
  }

  vimeoApiPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById("vimeo-player-api");
    if (existing) {
      if (window.Vimeo?.Player) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Vimeo API failed")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.id = "vimeo-player-api";
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Vimeo API failed"));
    document.head.appendChild(script);
  });

  return vimeoApiPromise;
}

function coverClass(fit: "fill" | "width"): string {
  if (fit === "width") {
    return "absolute top-0 left-0 h-[56.25vw] w-full";
  }

  return "absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2";
}

function buildVimeoEmbedSrc(videoId: string, startSeconds?: number): string {
  const params = new URLSearchParams({
    autoplay: "1",
    // Tenta autoplay com áudio; o init faz fallback para mudo se necessário.
    muted: "0",
    loop: "1",
    controls: "0",
    title: "0",
    byline: "0",
    portrait: "0",
    playsinline: "1",
  });

  const base = `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
  if (startSeconds != null && startSeconds > 0) {
    return `${base}#t=${startSeconds}s`;
  }
  return base;
}

function VolumeIcon({ muted }: { muted: boolean }) {
  if (muted) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 10v4h3l4 3V7L7 10H4z" fill="currentColor" />
        <path
          d="M16 9.5l4 4m0-4l-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 10v4h3l4 3V7L7 10H4z" fill="currentColor" />
      <path
        d="M15.5 8.5a4.5 4.5 0 010 7M17.5 6.5a7.5 7.5 0 010 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function VimeoBackgroundPlayer({
  video,
  fit = "fill",
  className = "",
}: VimeoBackgroundPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<VimeoPlayer | null>(null);
  const readyRef = useRef(false);
  const isMutedRef = useRef(true);

  const [isMuted, setIsMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!video.videoId) return;

    let cancelled = false;

    const init = async () => {
      try {
        await loadVimeoApi();
      } catch {
        if (!cancelled) setFailed(true);
        return;
      }

      if (cancelled || !window.Vimeo?.Player || !iframeRef.current) return;

      const player = new window.Vimeo.Player(iframeRef.current);
      playerRef.current = player;
      readyRef.current = false;
      setReady(false);

      const syncMutedFromPlayer = async () => {
        const actualMuted = await player.getMuted();
        if (cancelled) return actualMuted;
        isMutedRef.current = actualMuted;
        setIsMuted(actualMuted);
        return actualMuted;
      };

      try {
        await player.ready();
        if (cancelled) return;

        // Mantém o ícone alinhado ao mute real do Vimeo (volumechange / buffer).
        player.on("volumechange", () => {
          void syncMutedFromPlayer();
        });

        await player.setMuted(false);
        await player.setVolume(1);

        if (video.startSeconds != null && video.startSeconds > 0) {
          await player.setCurrentTime(video.startSeconds);
        }

        try {
          await player.play();
        } catch {
          // Autoplay com áudio bloqueado — fallback para mudo.
          await player.setMuted(true);
          await player.play().catch(() => {
            // Autoplay pode continuar bloqueado em casos extremos.
          });
        }

        if (!cancelled) {
          readyRef.current = true;
          setReady(true);
          // Fonte de verdade: estado real do player (não assumir mute/unmute).
          await syncMutedFromPlayer();
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    void init();

    return () => {
      cancelled = true;
      readyRef.current = false;
      const current = playerRef.current;
      playerRef.current = null;
      void current?.destroy().catch(() => {
        // ignore
      });
    };
  }, [video.startSeconds, video.videoId]);

  const toggleMute = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const player = playerRef.current;
    if (!player) return;

    try {
      // Fonte de verdade do ícone: estado real do player, não o React defasado.
      const currentMuted = await player.getMuted();

      if (currentMuted) {
        await player.setMuted(false);
        await player.setVolume(1);
        await player.play().catch(() => {
          // play pode falhar se já estiver tocando
        });
      } else {
        await player.setMuted(true);
      }

      const actualMuted = await player.getMuted();
      isMutedRef.current = actualMuted;
      setIsMuted(actualMuted);
    } catch {
      // Mantém o ícone anterior se a API falhar.
    }
  }, []);

  if (!video.videoId || failed) {
    return (
      <div
        className={`absolute inset-0 bg-accent ${className}`}
        role="img"
        aria-label={video.title}
      />
    );
  }

  const buttonPositionClass =
    fit === "width" ? "absolute right-5 sm:right-8" : "fixed right-5 sm:right-8";
  const buttonStyle =
    fit === "width"
      ? { top: "calc(56.25vw - 3.25rem)" }
      : { bottom: "max(1.25rem, env(safe-area-inset-bottom))" };

  return (
    <div className={`absolute inset-0 bg-black ${className}`}>
      {/* Camada de mídia isolada: overflow/blocker não podem cobrir o botão. */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`pointer-events-none ${coverClass(fit)}`} aria-hidden="true">
          <iframe
            ref={iframeRef}
            className="pointer-events-none absolute inset-0 h-full w-full border-0"
            src={buildVimeoEmbedSrc(video.videoId, video.startSeconds)}
            title={video.title}
            allow="autoplay; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        {/* Bloqueia interação no iframe para não expor UI nativa do Vimeo. */}
        <div className="absolute inset-0 z-10" aria-hidden="true" />
      </div>

      {/* Controles acima do blocker; pointer-events só no botão. */}
      <div className="pointer-events-none absolute inset-0 z-30">
        <button
          type="button"
          onClick={toggleMute}
          className={`touch-target pointer-events-auto ${buttonPositionClass} z-40 flex items-center justify-center text-white/85 transition-opacity duration-300 hover:text-white ${
            ready ? "" : "opacity-50"
          }`}
          style={buttonStyle}
          aria-label={isMuted ? "Ativar som" : "Silenciar"}
          aria-pressed={!isMuted}
        >
          <VolumeIcon muted={isMuted} />
        </button>
      </div>
    </div>
  );
}
