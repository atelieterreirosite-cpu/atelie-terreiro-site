import Image from "next/image";

import { EditorialText } from "@/components/ui/EditorialText";
import type { ImageAsset } from "@/types/views";

interface PortfolioMediaImageProps {
  image: ImageAsset;
  caption?: string;
}

/**
 * Área de exibição editorial: imagem integral, sem crop/distorção.
 * Sem fundo cinza — a moldura só limita altura e centraliza.
 */
export function PortfolioMediaImage({ image, caption }: PortfolioMediaImageProps) {
  const width = image.width && image.width > 0 ? image.width : 1600;
  const height = image.height && image.height > 0 ? image.height : 1200;

  return (
    <figure className="space-y-3">
      <div className="portfolio-media-frame flex w-full items-center justify-center overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 900px"
          className="h-auto max-h-full w-auto max-w-full object-contain"
          loading="lazy"
        />
      </div>
      {caption ? (
        <figcaption>
          <EditorialText
            text={caption}
            className="text-center text-xs leading-relaxed text-muted italic sm:text-sm"
          />
        </figcaption>
      ) : null}
    </figure>
  );
}
