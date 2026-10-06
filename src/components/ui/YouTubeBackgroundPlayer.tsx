"use client";

import {
  memo,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MutableRefObject,
} from "react";

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
  setVolume: (volume: number) => void;
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
        elementId: string | HTMLElement,
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

function unloadCaptions(player: YtPlayer) {
  try {
    player.unloadModule?.("captions");
    player.unloadModule?.("cc");
  } catch {
    // API pode variar conforme o vídeo
  }
}

function readIsMuted(player: YtPlayer): boolean {
  try {
    return Boolean(player.isMuted());
  } catch {
    return true;
  }
}

type PlayerStatus = { ready: true; muted: boolean } | { ready: false } | { failed: true };

interface YouTubeHostProps {
  videoId: string;
  startSeconds?: number;
  playerRef: MutableRefObject<YtPlayer | null>;
  readyRef: MutableRefObject<boolean>;
  onStatus: (status: PlayerStatus) => void;
}

/**
 * Isolado com memo estável para o React não reconciliar/limpar o iframe
 * injetado pela YouTube IFrame API quando o botão de volume atualiza estado.
 */
const YouTubeHost = memo(function YouTubeHost({
  videoId,
  startSeconds,
  playerRef,
  readyRef,
  onStatus,
}: YouTubeHostProps) {
  const reactId = useId().replace(/:/g, "");
  const hostRef = useRef<HTMLDivElement>(null);
  const onStatusRef = useRef(onStatus);

  useEffect(() => {
    onStatusRef.current = onStatus;
  }, [onStatus]);

  useEffect(() => {
    const hostRoot = hostRef.current;
    let cancelled = false;
    let hostElement: HTMLDivElement | null = null;
    let settleTimer: number | undefined;
    let markedReady = false;

    const emitReady = (player: YtPlayer, muted: boolean) => {
      if (cancelled || markedReady) return;
      markedReady = true;
      readyRef.current = true;
      playerRef.current = player;
      onStatusRef.current({ ready: true, muted });
    };

    const startMutedFallback = (player: YtPlayer) => {
      try {
        player.mute();
        player.playVideo();
      } catch {
        // ignore
      }
      emitReady(player, true);
    };

    const settlePlayback = (player: YtPlayer) => {
      if (cancelled || markedReady || !window.YT) return;

      const { PlayerState } = window.YT;
      let state = -1;
      try {
        state = player.getPlayerState();
      } catch {
        startMutedFallback(player);
        return;
      }

      const isActive =
        state === PlayerState.PLAYING || state === PlayerState.BUFFERING;
      const muted = readIsMuted(player);

      if (!isActive) {
        startMutedFallback(player);
        return;
      }

      // Reproduzindo: se ainda estiver mudo (política do navegador), mantém mudo.
      emitReady(player, muted);
    };

    const init = async () => {
      await loadYouTubeApi();
      if (cancelled || !window.YT?.Player || !hostRoot) return;

      playerRef.current?.destroy();
      playerRef.current = null;
      readyRef.current = false;
      markedReady = false;
      onStatusRef.current({ ready: false });

      hostElement = document.createElement("div");
      hostElement.id = `yt-bg-${reactId}`;
      hostElement.className = "h-full w-full";
      hostRoot.replaceChildren(hostElement);

      playerRef.current = new window.YT.Player(hostElement, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          // Tenta autoplay com áudio; fallback para mudo se o navegador bloquear.
          mute: 0,
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
          playlist: videoId,
          start: startSeconds ?? 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            if (cancelled) return;

            const player = event.target;
            playerRef.current = player;
            unloadCaptions(player);

            try {
              player.unMute();
              player.setVolume(100);
              player.playVideo();
            } catch {
              startMutedFallback(player);
              return;
            }

            // Garante que o botão nunca fique permanente disabled/ready=false.
            settleTimer = window.setTimeout(() => settlePlayback(player), 500);
          },
          onStateChange: (event) => {
            if (cancelled || !window.YT) return;

            const { PlayerState } = window.YT;

            if (
              event.data === PlayerState.ENDED ||
              event.data === PlayerState.PAUSED
            ) {
              event.target.playVideo();
              return;
            }

            if (event.data === PlayerState.PLAYING) {
              unloadCaptions(event.target);

              if (!markedReady) {
                // Se já está tocando com áudio, libera o botão sem esperar o timer.
                if (!readIsMuted(event.target)) {
                  if (settleTimer !== undefined) {
                    window.clearTimeout(settleTimer);
                    settleTimer = undefined;
                  }
                  emitReady(event.target, false);
                }
              }
            }
          },
          onError: () => {
            if (!cancelled) onStatusRef.current({ failed: true });
          },
        },
      });
    };

    void init();

    return () => {
      cancelled = true;
      if (settleTimer !== undefined) {
        window.clearTimeout(settleTimer);
      }
      readyRef.current = false;
      playerRef.current?.destroy();
      playerRef.current = null;
      hostElement?.remove();
      hostRoot?.replaceChildren();
    };
  }, [playerRef, readyRef, reactId, startSeconds, videoId]);

  return <div ref={hostRef} className="h-full w-full" />;
});

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

export function YouTubeBackgroundPlayer({
  video,
  fit = "fill",
  className = "",
}: YouTubeBackgroundPlayerProps) {
  const playerRef = useRef<YtPlayer | null>(null);
  const readyRef = useRef(false);
  const isMutedRef = useRef(true);

  const [isMuted, setIsMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleStatus = useCallback((status: PlayerStatus) => {
    if ("failed" in status) {
      setFailed(true);
      setReady(false);
      readyRef.current = false;
      return;
    }

    if (!status.ready) {
      setReady(false);
      isMutedRef.current = true;
      setIsMuted(true);
      return;
    }

    isMutedRef.current = status.muted;
    setIsMuted(status.muted);
    setReady(true);
  }, []);

  const toggleMute = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    // Diagnóstico do fluxo de clique → player (mantido mínimo e útil).
    console.log("[VideoAudio] volume button clicked");

    const player = playerRef.current;
    console.log("[VideoAudio] current isMuted:", isMutedRef.current, {
      hasPlayer: Boolean(player),
      ready: readyRef.current,
    });

    if (!player) {
      console.log("[VideoAudio] player instance missing");
      return;
    }

    try {
      const currentlyMuted = readIsMuted(player);
      console.log("[VideoAudio] player.isMuted():", currentlyMuted);

      if (currentlyMuted) {
        console.log("[VideoAudio] trying to unmute");
        player.unMute();
        player.setVolume(100);
        player.playVideo();
        console.log("[VideoAudio] unMute + setVolume(100) executed");
        // Ícone: não confiar em isMuted() imediato (atrasa na API do YT).
        isMutedRef.current = false;
        setIsMuted(false);
      } else {
        console.log("[VideoAudio] calling mute()");
        player.mute();
        isMutedRef.current = true;
        setIsMuted(true);
      }
    } catch (error) {
      console.log("[VideoAudio] toggle failed:", error);
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
        <div
          className={`pointer-events-none ${coverClass(fit)} [&_iframe]:pointer-events-none [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0`}
          aria-hidden="true"
        >
          <YouTubeHost
            videoId={video.videoId}
            startSeconds={video.startSeconds}
            playerRef={playerRef}
            readyRef={readyRef}
            onStatus={handleStatus}
          />
        </div>

        {/* Bloqueia hover/clique no iframe para não disparar UI nativa do YouTube. */}
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
