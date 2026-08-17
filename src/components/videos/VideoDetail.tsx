import Image from "next/image";
import Link from "next/link";

import { EditorialText } from "@/components/ui/EditorialText";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import type { ContentVideo, VideoView } from "@/types/views";

interface VideoDetailProps {
  video: VideoView;
}

function DetailPlayer({ content }: { content: ContentVideo }) {
  return (
    <div className="relative aspect-video overflow-hidden bg-accent">
      <VideoEmbed
        video={content}
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}

export function VideoDetail({ video }: VideoDetailProps) {
  const hasMeta = Boolean(video.platform || video.duration || video.publicationDate);

  return (
    <article className="pb-24">
      <div className="mx-auto max-w-7xl px-6 pt-8 md:px-10 md:pt-12">
        <Link
          href="/videos/"
          className="link-underline inline-flex items-center gap-2 text-xs tracking-[0.12em] text-muted uppercase transition-colors duration-300 hover:text-foreground"
        >
          ← Vídeos
        </Link>
      </div>

      <header className="mx-auto max-w-3xl px-6 pt-10 md:px-10 md:pt-14">
        {hasMeta ? (
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            {video.platform ? (
              <p className="text-sm tracking-[0.12em] text-muted-light uppercase">
                {video.platform}
              </p>
            ) : null}
            {video.duration ? <p className="text-sm text-muted">{video.duration}</p> : null}
            {video.publicationDate ? (
              <p className="text-sm text-muted">{video.publicationDate}</p>
            ) : null}
          </div>
        ) : null}

        <h1 className="font-display mt-4 text-3xl leading-tight font-light tracking-wide text-balance sm:text-4xl md:text-5xl lg:text-6xl">
          {video.title}
        </h1>
      </header>

      <div className="mx-auto mt-12 max-w-7xl px-6 md:px-10">
        {video.video ? (
          <DetailPlayer content={video.video} />
        ) : video.featuredImage ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-accent/5">
            <Image
              src={video.featuredImage.src}
              alt={video.featuredImage.alt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        ) : (
          <MediaPlaceholder />
        )}
      </div>

      <div className="mx-auto mt-16 max-w-3xl space-y-16 px-6 md:px-10">
        {video.descriptionText ? (
          <section className="space-y-4">
            <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Descrição</h2>
            <EditorialText
              text={video.descriptionText}
              className="text-base leading-relaxed text-foreground/90"
            />
          </section>
        ) : null}

        {(video.participants || video.credits) && (
          <section className="space-y-6 border-t border-border pt-12">
            <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Informações</h2>
            <dl className="space-y-4">
              {video.participants ? (
                <div>
                  <dt className="text-sm font-medium text-foreground">Participantes</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">
                    {video.participants}
                  </dd>
                </div>
              ) : null}
              {video.credits ? (
                <div>
                  <dt className="text-sm font-medium text-foreground">Créditos</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{video.credits}</dd>
                </div>
              ) : null}
            </dl>
          </section>
        )}

        {video.externalLink ? (
          <a
            href={video.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-block text-sm tracking-[0.12em] text-foreground uppercase"
          >
            Link externo →
          </a>
        ) : null}
      </div>
    </article>
  );
}
