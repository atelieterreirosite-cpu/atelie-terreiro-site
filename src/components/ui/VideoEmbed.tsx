import type { ContentVideo } from "@/types/views";

interface VideoEmbedProps {
  video: ContentVideo;
  className?: string;
}

function resolveEmbedUrl(video: ContentVideo): string | null {
  if (video.provider === "youtube" && video.videoId) {
    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
    });
    return `https://www.youtube.com/embed/${video.videoId}?${params.toString()}`;
  }

  if (video.provider === "vimeo" && video.videoId) {
    return `https://player.vimeo.com/video/${video.videoId}`;
  }

  if (video.provider === "file") {
    return video.url ?? null;
  }

  return video.url ?? null;
}

export function VideoEmbed({ video, className = "" }: VideoEmbedProps) {
  const embedUrl = resolveEmbedUrl(video);

  if (!embedUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-accent text-background ${className}`}
        role="img"
        aria-label={video.title}
      >
        <p className="max-w-sm px-6 text-center text-sm opacity-80">
          {video.description ?? video.title}
        </p>
      </div>
    );
  }

  if (video.provider === "file") {
    return (
      <video
        className={className || "h-full w-full"}
        src={embedUrl}
        controls
        playsInline
        aria-label={video.title}
      />
    );
  }

  return (
    <iframe
      className={className || "h-full w-full border-0"}
      src={embedUrl}
      title={video.title}
      allow="fullscreen; encrypted-media; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      loading="lazy"
      allowFullScreen
    />
  );
}
