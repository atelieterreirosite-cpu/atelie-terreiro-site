import { getPublications } from "@/lib/cms/client";
import type { CMSCollection, PortfolioContent } from "@/lib/cms/models";
import type { PublicationView } from "@/types/views";

import { mapImageAsset } from "./media";

let publicationsPromise: Promise<CMSCollection<PublicationView>> | null = null;

export function mapPublicationToView(item: PortfolioContent): PublicationView {
  return {
    slug: item.slug,
    title: item.title,
    excerpt: "",
    descriptionText: item.descriptionText,
    featuredImage: mapImageAsset(item.coverImage, item.title),
    gallery: item.images.flatMap((entry) => {
      const image = mapImageAsset(entry.image, item.title);
      return image ? [image] : [];
    }),
  };
}

export function mapPublicationsToViews(items: PortfolioContent[]): PublicationView[] {
  return items.filter((item) => item.status === "publish").map(mapPublicationToView);
}

async function fetchPublications(): Promise<CMSCollection<PublicationView>> {
  try {
    const items = await getPublications();
    return {
      endpoint: "publicacao",
      status: "ok",
      items: mapPublicationsToViews(items),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[CMS] Falha ao carregar /wp-json/wp/v2/publicacao: ${message}`);
    return { endpoint: "publicacao", status: "error", items: [], error: message };
  }
}

export function loadPublications(): Promise<CMSCollection<PublicationView>> {
  if (!publicationsPromise) {
    publicationsPromise = fetchPublications();
  }
  return publicationsPromise;
}

export async function getPublicationBySlugForView(
  slug: string,
): Promise<PublicationView | undefined> {
  const collection = await loadPublications();
  return collection.items.find((item) => item.slug === slug);
}

export async function getPublicationSlugsForStaticParams(): Promise<string[]> {
  return [];
}
