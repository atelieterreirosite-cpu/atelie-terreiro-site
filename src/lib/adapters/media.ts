import type { ACFImage } from "@/lib/cms/models";
import type { ImageAsset } from "@/types/views";

export function mapImageAsset(
  image: ACFImage | null | undefined,
  fallbackAlt: string,
): ImageAsset | undefined {
  if (!image?.url) return undefined;

  return {
    src: image.url,
    alt: image.alt?.trim() || image.title?.trim() || fallbackAlt,
  };
}

export function mapImageAssets(images: ACFImage[], fallbackAlt: string): ImageAsset[] {
  return images.flatMap((image, index) => {
    const mapped = mapImageAsset(image, `${fallbackAlt} ${index + 1}`);
    return mapped ? [mapped] : [];
  });
}
