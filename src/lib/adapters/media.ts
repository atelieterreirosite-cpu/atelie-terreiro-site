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
    ...(typeof image.width === "number" && image.width > 0 ? { width: image.width } : {}),
    ...(typeof image.height === "number" && image.height > 0 ? { height: image.height } : {}),
  };
}

export function mapImageAssets(images: ACFImage[], fallbackAlt: string): ImageAsset[] {
  return images.flatMap((image, index) => {
    const mapped = mapImageAsset(image, `${fallbackAlt} ${index + 1}`);
    return mapped ? [mapped] : [];
  });
}
