import { EditorialText } from "@/components/ui/EditorialText";
import type { PortfolioItemView } from "@/types/views";

import { PortfolioMediaImage } from "./PortfolioMediaImage";
import { PortfolioMediaVideo } from "./PortfolioMediaVideo";

interface PortfolioEntryProps {
  item: PortfolioItemView;
}

const captionClassName =
  "text-center text-xs leading-relaxed text-muted italic sm:text-sm";

/**
 * Publicação editorial aberta na página:
 * Título → capa (+ ficha) → descrição → imagens → vídeos.
 * Campos vazios não renderizam.
 */
export function PortfolioEntry({ item }: PortfolioEntryProps) {
  return (
    <article
      id={item.anchorId}
      className="scroll-mt-[calc(var(--header-height)+1.5rem)] space-y-8 border-t border-border pt-10 md:space-y-10 md:pt-14"
    >
      <h3 className="font-display text-center text-xl leading-tight font-light tracking-wide text-balance sm:text-2xl md:text-3xl">
        {item.title}
      </h3>

      {item.coverImage ? (
        <PortfolioMediaImage image={item.coverImage} caption={item.coverCaption} />
      ) : null}

      {!item.coverImage && item.coverCaption ? (
        <EditorialText text={item.coverCaption} className={captionClassName} />
      ) : null}

      {item.descriptionText ? (
        <EditorialText
          text={item.descriptionText}
          className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/90 md:text-lg"
          as="div"
        />
      ) : null}

      {item.images.length > 0 ? (
        <div className="space-y-10 md:space-y-12">
          {item.images.map((entry, index) => (
            <PortfolioMediaImage
              key={`${item.anchorId}-image-${index}`}
              image={entry.image}
              caption={entry.caption}
            />
          ))}
        </div>
      ) : null}

      {item.videos.length > 0 ? (
        <div className="space-y-10 md:space-y-12">
          {item.videos.map((entry, index) => (
            <PortfolioMediaVideo
              key={`${item.anchorId}-video-${index}`}
              video={entry.video}
              caption={entry.caption}
            />
          ))}
        </div>
      ) : null}
    </article>
  );
}
