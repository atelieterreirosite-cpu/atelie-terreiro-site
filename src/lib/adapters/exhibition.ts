import { getExhibitions } from "@/lib/cms/client";
import type { CMSCollection, PortfolioContent } from "@/lib/cms/models";
import type { ExhibitionView } from "@/types/views";

import { mapImageAsset } from "./media";

let exhibitionsPromise: Promise<CMSCollection<ExhibitionView>> | null = null;

export function mapExhibitionToView(item: PortfolioContent): ExhibitionView {
  return {
    slug: item.slug,
    title: item.title,
    period: "",
    onDisplay: false,
    excerpt: "",
    descriptionText: item.descriptionText,
    featuredImage: mapImageAsset(item.coverImage, item.title),
    gallery: item.images.flatMap((entry) => {
      const image = mapImageAsset(entry.image, item.title);
      return image ? [image] : [];
    }),
  };
}

export function mapExhibitionsToViews(items: PortfolioContent[]): ExhibitionView[] {
  return items.filter((item) => item.status === "publish").map(mapExhibitionToView);
}

async function fetchExhibitions(): Promise<CMSCollection<ExhibitionView>> {
  try {
    const items = await getExhibitions();
    return {
      endpoint: "exposicao",
      status: "ok",
      items: mapExhibitionsToViews(items),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[CMS] Falha ao carregar /wp-json/wp/v2/exposicao: ${message}`);
    return { endpoint: "exposicao", status: "error", items: [], error: message };
  }
}

export function loadExhibitions(): Promise<CMSCollection<ExhibitionView>> {
  if (!exhibitionsPromise) {
    exhibitionsPromise = fetchExhibitions();
  }
  return exhibitionsPromise;
}

export async function getExhibitionBySlugForView(
  slug: string,
): Promise<ExhibitionView | undefined> {
  const collection = await loadExhibitions();
  return collection.items.find((item) => item.slug === slug);
}

export async function getExhibitionSlugsForStaticParams(): Promise<string[]> {
  return [];
}
