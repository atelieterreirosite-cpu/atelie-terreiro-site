import Image from "next/image";
import Link from "next/link";

import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { VideoView } from "@/types/views";

interface VideoCardProps {
  video: VideoView;
}

export function VideoCard({ video }: VideoCardProps) {
  const href = `/videos/${video.slug}/`;
  const hasMeta = Boolean(
    video.platform || video.duration || video.publicationDate || video.participants,
  );

  return (
    <article className="group">
      <Link href={href} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-accent/5 sm:aspect-[3/4]">
          {video.featuredImage ? (
            <Image
              src={video.featuredImage.src}
              alt={video.featuredImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out motion-reduce:transition-none max-md:group-active:scale-[1.02] md:group-hover:scale-[1.03]"
            />
          ) : (
            <MediaPlaceholder
              label="Sem imagem"
              className="absolute inset-0 aspect-auto h-full min-h-full rounded-none"
            />
          )}
        </div>

        <div className="mt-5 space-y-2">
          {hasMeta ? (
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              {video.platform ? (
                <p className="text-xs tracking-[0.12em] text-muted-light uppercase">
                  {video.platform}
                </p>
              ) : null}
              {video.duration ? <p className="text-xs text-muted">{video.duration}</p> : null}
              {video.publicationDate ? (
                <p className="text-xs text-muted">{video.publicationDate}</p>
              ) : null}
              {video.participants ? (
                <p className="text-xs text-muted">{video.participants}</p>
              ) : null}
            </div>
          ) : null}

          <h2 className="font-display text-xl leading-snug font-light tracking-wide transition-colors duration-300 group-hover:text-accent sm:text-2xl md:text-3xl">
            {video.title}
          </h2>

          {video.excerpt ? (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted">{video.excerpt}</p>
          ) : null}

          <span className="link-underline inline-block pt-1 text-xs tracking-[0.12em] text-foreground/70 uppercase">
            Ver vídeo
          </span>
        </div>
      </Link>
    </article>
  );
}
