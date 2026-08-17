import Image from "next/image";
import Link from "next/link";

import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { ExhibitionView } from "@/types/views";

import { ExhibitionStatusBadge } from "./ExhibitionStatusBadge";

interface ExhibitionCardProps {
  exhibition: ExhibitionView;
}

export function ExhibitionCard({ exhibition }: ExhibitionCardProps) {
  const place = [exhibition.location, exhibition.city].filter(Boolean).join(" · ");

  return (
    <article className="group border-t border-border pt-8 first:border-t-0 first:pt-0">
      <Link
        href={`/exposicoes/${exhibition.slug}/`}
        className="grid gap-5 sm:gap-6 md:grid-cols-[minmax(0,140px)_1fr] md:gap-10"
      >
        <div className="space-y-2 sm:space-y-3">
          <ExhibitionStatusBadge onDisplay={exhibition.onDisplay} />
          {exhibition.period ? (
            <p className="font-display text-xl leading-tight font-light tracking-wide sm:text-2xl md:text-3xl">
              {exhibition.period}
            </p>
          ) : null}
        </div>

        <div className="space-y-4">
          <div className="relative aspect-[16/9] overflow-hidden bg-accent/5 md:hidden">
            {exhibition.featuredImage ? (
              <Image
                src={exhibition.featuredImage.src}
                alt={exhibition.featuredImage.alt}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 motion-reduce:transition-none max-md:group-active:scale-[1.01] md:group-hover:scale-[1.02]"
              />
            ) : (
              <MediaPlaceholder
                label="Sem imagem"
                className="absolute inset-0 aspect-auto h-full min-h-full"
              />
            )}
          </div>

          <h2 className="font-display text-xl leading-snug font-light tracking-wide transition-colors duration-300 group-hover:text-accent sm:text-2xl md:text-3xl">
            {exhibition.title}
          </h2>

          {place ? <p className="text-sm leading-relaxed text-muted">{place}</p> : null}

          {exhibition.excerpt ? (
            <p className="line-clamp-2 text-sm leading-relaxed text-foreground/80">
              {exhibition.excerpt}
            </p>
          ) : null}

          <span className="link-underline inline-block text-xs tracking-[0.12em] text-foreground/70 uppercase">
            Ver exposição
          </span>
        </div>
      </Link>
    </article>
  );
}
