import { getWorks } from "@/lib/cms/client";
import type { CMSCollection, PortfolioContent } from "@/lib/cms/models";
import type { WorkView } from "@/types/views";

import { mapImageAsset } from "./media";
import { mapContentVideo } from "./video";

let worksPromise: Promise<CMSCollection<WorkView>> | null = null;

export function mapWorkToView(item: PortfolioContent): WorkView {
  const firstVideo = item.videos[0];

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
    video: firstVideo
      ? mapContentVideo(firstVideo.videoFile, firstVideo.videoUrl, item.title)
      : undefined,
  };
}

export function mapWorksToViews(items: PortfolioContent[]): WorkView[] {
  return items.filter((item) => item.status === "publish").map(mapWorkToView);
}

async function fetchWorks(): Promise<CMSCollection<WorkView>> {
  try {
    const items = await getWorks();
    return { endpoint: "obra", status: "ok", items: mapWorksToViews(items) };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[CMS] Falha ao carregar /wp-json/wp/v2/obra: ${message}`);
    return { endpoint: "obra", status: "error", items: [], error: message };
  }
}

export function loadWorks(): Promise<CMSCollection<WorkView>> {
  if (!worksPromise) {
    worksPromise = fetchWorks();
  }
  return worksPromise;
}

export async function getWorkBySlugForView(slug: string): Promise<WorkView | undefined> {
  const collection = await loadWorks();
  return collection.items.find((work) => work.slug === slug);
}

export async function getWorkSlugsForStaticParams(): Promise<string[]> {
  return [];
}
