"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { HomeVideo } from "@/types/views";

interface YouTubeBackgroundPlayerProps {
  video: HomeVideo;
  /** fill — cover fullscreen; width — 16:9 pela largura */
  fit?: "fill" | "width";
  className?: string;
}

interface YtPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getPlayerState: () => number;
  destroy: () => void;
  unloadModule?: (module: string) => void;
}

interface YtPlayerEvent {
  data: number;
  target: YtPlayer;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          width?: string | number;
          height?: string | number;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: { target: YtPlayer }) => void;
            onStateChange?: (event: YtPlayerEvent) => void;
            onError?: () => void;
          };
        },
      ) => YtPlayer;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.YT?.Player) {
    return Promise.resolve();
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  youtubeApiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };

    if (!document.getElementById("youtube-iframe-api")) {
      const script = document.createElement("script");
      script.id = "youtube-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return youtubeApiPromise;
}

function coverClass(fit: "fill" | "width"): string {
  if (fit === "width") {
    return "absolute top-0 left-0 h-[56.25vw] w-full";
  }

  return "absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2";
}

export function YouTubeBackgroundPlayer({
  video,
  fit = "fill",
  className = "",
}: YouTubeBackgroundPlayerProps) {
  const reactId = useId().replace(/:/g, "");
  const containerId = `yt-bg-${reactId}`;
  const playerRef = useRef<YtPlayer | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!video.videoId) return;

    let cancelled = false;

    const init = async () => {
      await loadYouTubeApi();
      if (cancelled || !window.YT?.Player) return;

      playerRef.current?.destroy();

      playerRef.current = new window.YT.Player(containerId, {
        videoId: video.videoId!,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
          loop: 1,
          playlist: video.videoId!,
          start: video.startSeconds ?? 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            if (cancelled) return;
            try {
              event.target.unloadModule?.("captions");
              event.target.unloadModule?.("cc");
            } catch {
              // API pode variar conforme o vídeo
            }
            event.target.mute();
            event.target.playVideo();
            setIsMuted(true);
            setIsPlaying(true);
            setReady(true);
          },
          onStateChange: (event) => {
            if (cancelled || !window.YT) return;

            const { PlayerState } = window.YT;
            if (event.data === PlayerState.ENDED) {
              event.target.playVideo();
            }
            if (event.data === PlayerState.PLAYING) {
              try {
                event.target.unloadModule?.("captions");
                event.target.unloadModule?.("cc");
              } catch {
                // ignore
              }
              setIsPlaying(true);
            }
            if (event.data === PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          },
          onError: () => {
            if (!cancelled) setFailed(true);
          },
        },
      });
    };

    void init();

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [containerId, video.startSeconds, video.videoId]);

  const toggleMute = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      const player = playerRef.current;
      if (!player || !ready) return;

      if (isMuted) {
        player.unMute();
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    },
    [isMuted, ready],
  );

  const handleSurfaceClick = useCallback(() => {
    const player = playerRef.current;
    if (!player || !ready) return;

    if (isPlaying) {
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      player.playVideo();
      setIsPlaying(true);
    }
  }, [isPlaying, ready]);

  if (!video.videoId || failed) {
    return (
      <div
        className={`absolute inset-0 bg-accent ${className}`}
        role="img"
        aria-label={video.title}
      />
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden bg-black ${className}`}>
      <div
        className={`pointer-events-none ${coverClass(fit)} [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0`}
      >
        <div id={containerId} className="h-full w-full" />
      </div>

      <button
        type="button"
        className="absolute inset-0 z-10 cursor-default border-0 bg-transparent"
        aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
        onClick={handleSurfaceClick}
      />

      <button
        type="button"
        onClick={toggleMute}
        className="touch-target fixed right-5 z-40 flex items-center justify-center text-white/85 transition-opacity duration-300 hover:text-white sm:right-8"
        style={{
          bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        }}
        aria-label={isMuted ? "Ativar som" : "Silenciar"}
      >
        {isMuted ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 10v4h3l4 3V7L7 10H4z" fill="currentColor" />
            <path
              d="M16 9.5l4 4m0-4l-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 10v4h3l4 3V7L7 10H4z" fill="currentColor" />
            <path
              d="M15.5 8.5a4.5 4.5 0 010 7M17.5 6.5a7.5 7.5 0 010 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
