import Image from "next/image";
import Link from "next/link";

import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { WorkView } from "@/types/views";

interface WorkCardProps {
  work: WorkView;
}

export function WorkCard({ work }: WorkCardProps) {
  const href = `/obras/${work.slug}/`;
  const meta = [work.artist, work.year, work.technique].filter(Boolean);

  return (
    <article className="group">
      <Link href={href} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-accent/5 sm:aspect-[3/4]">
          {work.featuredImage ? (
            <Image
              src={work.featuredImage.src}
              alt={work.featuredImage.alt}
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
          {meta.length > 0 ? (
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              {work.artist ? (
                <p className="text-xs tracking-[0.12em] text-muted-light uppercase">{work.artist}</p>
              ) : null}
              {work.year ? <p className="text-xs text-muted">{work.year}</p> : null}
              {work.technique ? <p className="text-xs text-muted">{work.technique}</p> : null}
            </div>
          ) : null}

          <h2 className="font-display text-xl leading-snug font-light tracking-wide transition-colors duration-300 group-hover:text-accent sm:text-2xl md:text-3xl">
            {work.title}
          </h2>

          {work.excerpt ? (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted">{work.excerpt}</p>
          ) : null}

          <span className="link-underline inline-block pt-1 text-xs tracking-[0.12em] text-foreground/70 uppercase">
            Ver obra
          </span>
        </div>
      </Link>
    </article>
  );
}
