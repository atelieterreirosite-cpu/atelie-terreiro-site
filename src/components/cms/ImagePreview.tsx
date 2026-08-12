import type { ACFImage } from "@/lib/cms/models";

interface ImagePreviewProps {
  image: ACFImage | null;
  fallbackAlt: string;
  eager?: boolean;
}

export function ImagePreview({ image, fallbackAlt, eager = false }: ImagePreviewProps) {
  if (!image?.url) {
    return (
      <div className="media-placeholder" aria-label="Imagem não informada">
        <span>Sem imagem</span>
      </div>
    );
  }

  return (
    <div className="image-preview">
      {/* A prova usa img nativo porque o host de mídia do CMS é temporário. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.url}
        alt={image.alt || fallbackAlt}
        width={image.width}
        height={image.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
      <span className="media-chip">Imagem · WordPress</span>
    </div>
  );
}
