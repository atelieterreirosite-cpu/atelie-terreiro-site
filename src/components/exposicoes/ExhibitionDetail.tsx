import Image from "next/image";
import Link from "next/link";

import { EditorialText } from "@/components/ui/EditorialText";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { ExhibitionView } from "@/types/views";

import { ExhibitionStatusBadge } from "./ExhibitionStatusBadge";

interface ExhibitionDetailProps {
  exhibition: ExhibitionView;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[120px_1fr] sm:gap-4">
      <dt className="text-xs tracking-[0.12em] text-muted-light uppercase">{label}</dt>
      <dd className="text-sm leading-relaxed text-foreground/90">{value}</dd>
    </div>
  );
}

export function ExhibitionDetail({ exhibition }: ExhibitionDetailProps) {
  const hasInfo = Boolean(
    exhibition.startDate ||
      exhibition.endDate ||
      exhibition.location ||
      exhibition.city ||
      exhibition.curation ||
      exhibition.artists,
  );

  return (
    <article className="pb-24">
      <div className="mx-auto max-w-4xl px-6 pt-8 md:px-10 md:pt-12">
        <Link
          href="/exposicoes/"
          className="link-underline inline-flex items-center gap-2 text-xs tracking-[0.12em] text-muted uppercase transition-colors duration-300 hover:text-foreground"
        >
          ← Exposições
        </Link>
      </div>

      <header className="mx-auto max-w-4xl px-6 pt-10 md:px-10 md:pt-14">
        {exhibition.onDisplay ? (
          <div className="mb-4">
            <ExhibitionStatusBadge onDisplay={exhibition.onDisplay} />
          </div>
        ) : null}

        <h1 className="font-display mt-4 text-3xl leading-tight font-light tracking-wide text-balance sm:text-4xl md:text-5xl">
          {exhibition.title}
        </h1>
      </header>

      {hasInfo ? (
        <div className="mx-auto mt-10 max-w-4xl px-6 md:px-10">
          <dl className="space-y-4 border-y border-border py-8">
            {exhibition.startDate ? (
              <InfoRow label="Início" value={exhibition.startDate} />
            ) : null}
            {exhibition.endDate ? <InfoRow label="Fim" value={exhibition.endDate} /> : null}
            {exhibition.location ? <InfoRow label="Local" value={exhibition.location} /> : null}
            {exhibition.city ? <InfoRow label="Cidade" value={exhibition.city} /> : null}
            {exhibition.curation ? (
              <InfoRow label="Curadoria" value={exhibition.curation} />
            ) : null}
            {exhibition.artists ? (
              <InfoRow label="Artistas" value={exhibition.artists} />
            ) : null}
          </dl>
        </div>
      ) : null}

      <div className="mx-auto mt-12 max-w-4xl px-6 md:px-10">
        {exhibition.featuredImage ? (
          <div className="relative aspect-[16/9] overflow-hidden bg-accent/5">
            <Image
              src={exhibition.featuredImage.src}
              alt={exhibition.featuredImage.alt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        ) : (
          <MediaPlaceholder />
        )}
      </div>

      <div className="mx-auto mt-16 max-w-3xl space-y-12 px-6 md:px-10">
        {exhibition.descriptionText ? (
          <section className="space-y-4">
            <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Descrição</h2>
            <EditorialText
              text={exhibition.descriptionText}
              className="text-base leading-relaxed text-foreground/90"
            />
          </section>
        ) : null}

        {exhibition.attachment ? (
          <a
            href={exhibition.attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-block text-sm tracking-[0.12em] text-foreground uppercase"
          >
            Abrir anexo →
          </a>
        ) : null}

        {exhibition.externalLink ? (
          <a
            href={exhibition.externalLink}
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
