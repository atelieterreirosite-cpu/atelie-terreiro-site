import Image from "next/image";

import type { AboutBlock } from "@/types/views";

interface AboutSectionProps {
  block: AboutBlock;
}

export function AboutSection({ block }: AboutSectionProps) {
  const imageWidth = block.image?.width && block.image.width > 0 ? block.image.width : 1600;
  const imageHeight = block.image?.height && block.image.height > 0 ? block.image.height : 1200;

  return (
    <section id={block.id} className="scroll-mt-28 space-y-8">
      {block.title ? (
        <h2 className="font-display text-xl font-light tracking-wide sm:text-2xl md:text-3xl">
          {block.title}
        </h2>
      ) : null}

      {block.image ? (
        <figure className="space-y-3">
          <div className="editorial-media-frame flex w-full items-center justify-center overflow-hidden">
            <Image
              src={block.image.src}
              alt={block.image.alt}
              width={imageWidth}
              height={imageHeight}
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          </div>
          {block.image.caption ? (
            <figcaption className="text-xs leading-relaxed text-muted-light">
              {block.image.caption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      <div className="space-y-5">
        {block.paragraphs.map((paragraph, index) => (
          <p key={index} className="whitespace-pre-line text-base leading-relaxed text-foreground/90 md:text-lg">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
