import Image from "next/image";
import Link from "next/link";

import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { PublicationView } from "@/types/views";

interface PublicationCardProps {
  publication: PublicationView;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const href = `/publicacoes/${publication.slug}/`;
  const hasMeta = Boolean(
    publication.publicationType || publication.authors || publication.year,
  );

  return (
    <article className="group">
      <Link href={href} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-accent/5 sm:aspect-[3/4]">
          {publication.featuredImage ? (
            <Image
              src={publication.featuredImage.src}
              alt={publication.featuredImage.alt}
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
              {publication.publicationType ? (
                <p className="text-xs tracking-[0.12em] text-muted-light uppercase">
                  {publication.publicationType}
                </p>
              ) : null}
              {publication.authors ? (
                <p className="text-xs text-muted">{publication.authors}</p>
              ) : null}
              {publication.year ? (
                <p className="text-xs text-muted">{publication.year}</p>
              ) : null}
            </div>
          ) : null}

          <h2 className="font-display text-xl leading-snug font-light tracking-wide transition-colors duration-300 group-hover:text-accent sm:text-2xl md:text-3xl">
            {publication.title}
          </h2>

          {publication.excerpt ? (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted">
              {publication.excerpt}
            </p>
          ) : null}

          <span className="link-underline inline-block pt-1 text-xs tracking-[0.12em] text-foreground/70 uppercase">
            Ver publicação
          </span>
        </div>
      </Link>
    </article>
  );
}
