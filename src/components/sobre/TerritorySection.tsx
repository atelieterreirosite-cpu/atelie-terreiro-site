import Image from "next/image";

import { EditorialText } from "@/components/ui/EditorialText";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { TerritoryBlock, TerritorySectionView } from "@/types/views";

interface TerritorySectionProps {
  section: TerritorySectionView;
}

function TerritoryBlockRow({ block, index }: { block: TerritoryBlock; index: number }) {
  const imageOnRight = index % 2 === 1;
  const imageSrc = block.image?.src?.trim();
  const imageAlt = block.image?.alt?.trim() || "Imagem do território";

  return (
    <article className="grid items-start gap-8 md:gap-10 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-20">
      <figure
        className={`min-w-0 lg:col-span-6 ${imageOnRight ? "lg:col-start-7" : "lg:col-start-1"}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-accent/5 sm:aspect-[16/10]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <MediaPlaceholder
              label="Imagem não disponível"
              className="absolute inset-0 aspect-auto h-full min-h-full"
            />
          )}
        </div>
        {block.image?.caption ? (
          <figcaption className="mt-3 text-xs leading-relaxed text-muted-light">
            {block.image.caption}
          </figcaption>
        ) : null}
      </figure>

      <div
        className={`min-w-0 max-w-md space-y-5 lg:col-span-5 ${
          imageOnRight ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-8"
        } lg:pt-2 xl:pt-4`}
      >
        {block.paragraphs.map((paragraph, paragraphIndex) => (
          <EditorialText
            key={paragraphIndex}
            text={paragraph}
            className="text-base leading-relaxed text-foreground/90 md:text-lg"
          />
        ))}
      </div>
    </article>
  );
}

export function TerritorySection({ section }: TerritorySectionProps) {
  return (
    <section id={section.id} className="scroll-mt-28 space-y-14 sm:space-y-20 md:space-y-24">
      {section.title ? (
        <h2 className="mx-auto max-w-3xl font-display text-2xl font-light tracking-wide sm:text-3xl md:text-4xl">
          {section.title}
        </h2>
      ) : null}

      <div className="space-y-16 sm:space-y-20 md:space-y-28">
        {section.blocks.map((block, index) => (
          <TerritoryBlockRow key={index} block={block} index={index} />
        ))}
      </div>
    </section>
  );
}
