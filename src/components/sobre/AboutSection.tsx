import Image from "next/image";

import type { AboutBlock } from "@/types/views";

interface AboutSectionProps {
  block: AboutBlock;
}

export function AboutSection({ block }: AboutSectionProps) {
  return (
    <section id={block.id} className="scroll-mt-28 space-y-8">
      {block.title ? (
        <h2 className="font-display text-2xl font-light tracking-wide sm:text-3xl md:text-4xl">
          {block.title}
        </h2>
      ) : null}

      {block.image ? (
        <figure className="space-y-3">
          <div className="relative aspect-[16/10] overflow-hidden bg-accent/5">
            <Image
              src={block.image.src}
              alt={block.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
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
