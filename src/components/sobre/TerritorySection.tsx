import Image from "next/image";

import { EditorialText } from "@/components/ui/EditorialText";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { editorialFrameAlignClass } from "@/lib/media/editorialFrame";
import type { TerritoryBlock, TerritorySectionView } from "@/types/views";

interface TerritorySectionProps {
  section: TerritorySectionView;
}

function TerritoryBlockRow({ block, index }: { block: TerritoryBlock; index: number }) {
  const imageOnRight = index % 2 === 1;
  const imageSrc = block.image?.src?.trim();
  const imageAlt = block.image?.alt?.trim() || "Imagem do território";
  const imageWidth = block.image?.width && block.image.width > 0 ? block.image.width : 1600;
  const imageHeight = block.image?.height && block.image.height > 0 ? block.image.height : 1200;
  const frameAlign = editorialFrameAlignClass(block.image?.width, block.image?.height);

  return (
    <article className="grid items-start gap-6 md:gap-8 lg:grid-cols-12 lg:gap-x-6 xl:gap-x-8">
      <figure
        className={`min-w-0 lg:col-span-7 ${
          imageOnRight ? "lg:col-start-6" : "lg:col-start-1"
        }`}
      >
        <div
          className={`flex h-[min(60vh,32rem)] min-h-56 w-full overflow-hidden sm:min-h-64 md:h-[min(68vh,36rem)] lg:h-[min(72vh,40rem)] ${frameAlign}`}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          ) : (
            <MediaPlaceholder label="Imagem não disponível" className="h-full min-h-full w-full" />
          )}
        </div>
        {block.image?.caption ? (
          <figcaption className="mt-3 text-xs leading-relaxed text-muted-light">
            {block.image.caption}
          </figcaption>
        ) : null}
      </figure>

      <div
        className={`min-w-0 space-y-5 lg:col-span-5 ${
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
        <h2 className="text-left font-display text-xl font-light tracking-wide sm:text-2xl md:text-3xl">
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
