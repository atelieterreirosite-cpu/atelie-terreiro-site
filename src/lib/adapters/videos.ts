import { getVideos } from "@/lib/cms/client";
import type { CMSCollection, VideoContent } from "@/lib/cms/models";
import type { VideoView } from "@/types/views";

import { formatDisplayDate } from "./dates";
import { mapImageAsset } from "./media";
import { mapContentVideo } from "./video";

/**
 * Adapter CMS (`VideoContent` do CPT `video`) → view-model da UI.
 * Consome apenas `getVideos()`. Coleção independente — sem relações.
 *
 * `mapContentVideo` / `mapHomeVideo` permanecem em `./video` (helpers reutilizáveis).
 */

let videosPromise: Promise<CMSCollection<VideoView>> | null = null;

export function mapVideoItemToView(item: VideoContent): VideoView {
  return {
    slug: item.slug,
    title: item.content.title,
    platform: item.details.platform ?? undefined,
    duration: item.details.duration ?? undefined,
    publicationDate: formatDisplayDate(item.details.publicationDate) ?? undefined,
    participants: item.details.participants ?? undefined,
    excerpt: item.content.summary ?? "",
    descriptionText: item.content.descriptionText,
    credits: item.details.credits ?? undefined,
    featuredImage: mapImageAsset(item.content.image, item.content.title),
    video: mapContentVideo(item.details.videoFile, item.details.videoUrl, item.content.title),
    externalLink: item.content.externalLink ?? undefined,
  };
}

export function mapVideoItemsToViews(items: VideoContent[]): VideoView[] {
  // Mantém a ordem do client (`orderby=date&order=desc`).
  return items.map(mapVideoItemToView);
}

async function fetchVideos(): Promise<CMSCollection<VideoView>> {
  try {
    const items = await getVideos();
    return {
      endpoint: "video",
      status: "ok",
      items: mapVideoItemsToViews(items),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[CMS] Falha ao carregar /wp-json/wp/v2/video: ${message}`);
    return { endpoint: "video", status: "error", items: [], error: message };
  }
}

/**
 * Isola falha de `getVideos()` no espírito de `safeCollection`.
 * Memoizado no processo de build para listagem, params e detalhe.
 */
export function loadVideos(): Promise<CMSCollection<VideoView>> {
  if (!videosPromise) {
    videosPromise = fetchVideos();
  }
  return videosPromise;
}

export async function getVideoBySlugForView(slug: string): Promise<VideoView | undefined> {
  const collection = await loadVideos();
  return collection.items.find((video) => video.slug === slug);
}

export async function getVideoSlugsForStaticParams(): Promise<string[]> {
  const collection = await loadVideos();
  if (collection.status === "error") return [];
  return collection.items.map((video) => video.slug).filter(Boolean);
}
