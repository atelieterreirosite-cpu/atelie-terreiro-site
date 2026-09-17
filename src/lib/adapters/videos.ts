import { getVideos } from "@/lib/cms/client";
import type { CMSCollection, PortfolioContent } from "@/lib/cms/models";
import type { VideoView } from "@/types/views";

import { mapImageAsset } from "./media";
import { mapContentVideo } from "./video";

/**
 * Adapter legado de Vídeos. A experiência pública usa `loadPortfolio()`.
 * `mapContentVideo` / `mapHomeVideo` permanecem em `./video`.
 */

let videosPromise: Promise<CMSCollection<VideoView>> | null = null;

export function mapVideoItemToView(item: PortfolioContent): VideoView {
  const firstVideo = item.videos[0];

  return {
    slug: item.slug,
    title: item.title,
    excerpt: "",
    descriptionText: item.descriptionText,
    featuredImage: mapImageAsset(item.coverImage, item.title),
    video: firstVideo
      ? mapContentVideo(firstVideo.videoFile, firstVideo.videoUrl, item.title)
      : undefined,
  };
}

export function mapVideoItemsToViews(items: PortfolioContent[]): VideoView[] {
  return items.filter((item) => item.status === "publish").map(mapVideoItemToView);
}

async function fetchVideos(): Promise<CMSCollection<VideoView>> {
  try {
    const items = await getVideos();
    return { endpoint: "video", status: "ok", items: mapVideoItemsToViews(items) };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[CMS] Falha ao carregar /wp-json/wp/v2/video: ${message}`);
    return { endpoint: "video", status: "error", items: [], error: message };
  }
}

export function loadVideos(): Promise<CMSCollection<VideoView>> {
  if (!videosPromise) {
    videosPromise = fetchVideos();
  }
  return videosPromise;
}

export async function getVideoBySlugForView(slug: string): Promise<VideoView | undefined> {
  const collection = await loadVideos();
  return collection.items.find((item) => item.slug === slug);
}

export async function getVideoSlugsForStaticParams(): Promise<string[]> {
  return [];
}
