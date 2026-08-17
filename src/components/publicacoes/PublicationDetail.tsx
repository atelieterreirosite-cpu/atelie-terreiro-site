import Image from "next/image";
import Link from "next/link";

import { EditorialText } from "@/components/ui/EditorialText";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { PublicationView } from "@/types/views";

interface PublicationDetailProps {
  publication: PublicationView;
}

export function PublicationDetail({ publication }: PublicationDetailProps) {
  const hasMeta = Boolean(
    publication.publicationType || publication.authors || publication.year,
  );

  return (
    <article className="pb-24">
      <div className="mx-auto max-w-7xl px-6 pt-8 md:px-10 md:pt-12">
        <Link
          href="/publicacoes/"
          className="link-underline inline-flex items-center gap-2 text-xs tracking-[0.12em] text-muted uppercase transition-colors duration-300 hover:text-foreground"
        >
          ← Publicações
        </Link>
      </div>

      <header className="mx-auto max-w-3xl px-6 pt-10 md:px-10 md:pt-14">
        {hasMeta ? (
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            {publication.publicationType ? (
              <p className="text-sm tracking-[0.12em] text-muted-light uppercase">
                {publication.publicationType}
              </p>
            ) : null}
            {publication.authors ? (
              <p className="text-sm text-muted">{publication.authors}</p>
            ) : null}
            {publication.year ? (
              <p className="text-sm text-muted">{publication.year}</p>
            ) : null}
          </div>
        ) : null}

        <h1 className="font-display mt-4 text-3xl leading-tight font-light tracking-wide text-balance sm:text-4xl md:text-5xl lg:text-6xl">
          {publication.title}
        </h1>
      </header>

      <div className="mx-auto mt-12 max-w-7xl px-6 md:px-10">
        {publication.featuredImage ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-accent/5">
            <Image
              src={publication.featuredImage.src}
              alt={publication.featuredImage.alt}
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
        {publication.descriptionText ? (
          <section className="space-y-4">
            <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Descrição</h2>
            <EditorialText
              text={publication.descriptionText}
              className="text-base leading-relaxed text-foreground/90"
            />
          </section>
        ) : null}

        {publication.credits ? (
          <section className="space-y-6 border-t border-border pt-12">
            <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Informações</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-foreground">Créditos</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">{publication.credits}</dd>
              </div>
            </dl>
          </section>
        ) : null}

        {publication.attachment ? (
          <a
            href={publication.attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-block text-sm tracking-[0.12em] text-foreground uppercase"
          >
            Abrir publicação →
          </a>
        ) : null}

        {publication.externalLink ? (
          <a
            href={publication.externalLink}
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
