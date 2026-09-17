import { EditorialText } from "@/components/ui/EditorialText";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import type { ContentVideo } from "@/types/views";

interface PortfolioMediaVideoProps {
  video: ContentVideo;
  caption?: string;
}

/**
 * Vídeo sob demanda (sem autoplay). Reutiliza VideoEmbed (YouTube / Vimeo / arquivo).
 */
export function PortfolioMediaVideo({ video, caption }: PortfolioMediaVideoProps) {
  return (
    <figure className="space-y-3">
      <div className="relative aspect-video w-full overflow-hidden bg-accent">
        <VideoEmbed video={video} className="absolute inset-0 h-full w-full border-0" />
      </div>
      {caption ? (
        <figcaption>
          <EditorialText
            text={caption}
            className="text-sm leading-relaxed text-muted sm:text-base"
          />
        </figcaption>
      ) : null}
    </figure>
  );
}
