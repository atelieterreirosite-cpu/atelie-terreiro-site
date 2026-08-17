import Image from "next/image";
import Link from "next/link";

import { EditorialText } from "@/components/ui/EditorialText";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import type { ContentVideo, WorkView } from "@/types/views";

interface WorkDetailProps {
  work: WorkView;
}

function WorkVideo({ video }: { video: ContentVideo }) {
  return (
    <div className="relative aspect-video overflow-hidden bg-accent">
      <VideoEmbed
        video={video}
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}

export function WorkDetail({ work }: WorkDetailProps) {
  const hasMeta = Boolean(work.artist || work.year || work.technique);
  const videoAsHero = Boolean(work.video) && !work.featuredImage;

  return (
    <article className="pb-24">
      <div className="mx-auto max-w-7xl px-6 pt-8 md:px-10 md:pt-12">
        <Link
          href="/obras/"
          className="link-underline inline-flex items-center gap-2 text-xs tracking-[0.12em] text-muted uppercase transition-colors duration-300 hover:text-foreground"
        >
          ← Obras
        </Link>
      </div>

      <header className="mx-auto max-w-3xl px-6 pt-10 md:px-10 md:pt-14">
        {hasMeta ? (
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            {work.artist ? (
              <p className="text-sm tracking-[0.12em] text-muted-light uppercase">{work.artist}</p>
            ) : null}
            {work.year ? <p className="text-sm text-muted">{work.year}</p> : null}
            {work.technique ? <p className="text-sm text-muted">{work.technique}</p> : null}
          </div>
        ) : null}

        <h1 className="font-display mt-4 text-3xl leading-tight font-light tracking-wide text-balance sm:text-4xl md:text-5xl lg:text-6xl">
          {work.title}
        </h1>
      </header>

      <div className="mx-auto mt-12 max-w-7xl px-6 md:px-10">
        {work.featuredImage ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-accent/5">
            <Image
              src={work.featuredImage.src}
              alt={work.featuredImage.alt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        ) : work.video ? (
          <WorkVideo video={work.video} />
        ) : (
          <MediaPlaceholder />
        )}
      </div>

      <div className="mx-auto mt-16 max-w-3xl space-y-16 px-6 md:px-10">
        {work.descriptionText ? (
          <section className="space-y-4">
            <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Descrição</h2>
            <EditorialText
              text={work.descriptionText}
              className="text-base leading-relaxed text-foreground/90"
            />
          </section>
        ) : null}

        {(work.dimensions || work.credits) && (
          <section className="space-y-6 border-t border-border pt-12">
            <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Informações</h2>
            <dl className="space-y-4">
              {work.dimensions ? (
                <div>
                  <dt className="text-sm font-medium text-foreground">Dimensões</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{work.dimensions}</dd>
                </div>
              ) : null}
              {work.credits ? (
                <div>
                  <dt className="text-sm font-medium text-foreground">Créditos</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{work.credits}</dd>
                </div>
              ) : null}
            </dl>
          </section>
        )}

        {work.video && !videoAsHero ? (
          <section className="space-y-8">
            <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Vídeo</h2>
            <WorkVideo video={work.video} />
          </section>
        ) : null}

        {work.attachment ? (
          <a
            href={work.attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-block text-sm tracking-[0.12em] text-foreground uppercase"
          >
            Abrir anexo →
          </a>
        ) : null}

        {work.externalLink ? (
          <a
            href={work.externalLink}
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
