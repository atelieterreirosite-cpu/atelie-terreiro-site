import type { VideoView } from "@/types/views";

import { VideoCard } from "./VideoCard";

interface VideoGridProps {
  videos: VideoView[];
}

export function VideoGrid({ videos }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <p className="mx-auto max-w-7xl px-6 pb-20 text-sm text-muted md:px-10 md:pb-24">
        Nenhum vídeo para exibir.
      </p>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-12 px-6 pb-20 sm:gap-y-16 sm:pb-24 md:grid-cols-2 md:px-10 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.slug} video={video} />
      ))}
    </div>
  );
}
