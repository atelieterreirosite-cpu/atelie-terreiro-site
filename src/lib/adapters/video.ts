import type { ACFFile } from "@/lib/cms/models";
import { getVideoSource } from "@/lib/cms/video";
import type { ContentVideo, HomeVideo } from "@/types/views";

function idFromEmbedUrl(embedUrl: string): string | undefined {
  const segment = embedUrl.split("/").filter(Boolean).at(-1);
  return segment || undefined;
}

/**
 * Prioridade arquivo → URL, centralizada em `getVideoSource`.
 * Componentes recebem o view-model já resolvido.
 */
export function mapContentVideo(
  videoFile: ACFFile | null | undefined,
  videoUrl: string | null | undefined,
  title: string,
  description?: string | null,
): ContentVideo | undefined {
  const source = getVideoSource(videoFile, videoUrl);

  if (source.type === "youtube") {
    const videoId = idFromEmbedUrl(source.embedUrl);
    if (!videoId) return undefined;
    return {
      provider: "youtube",
      videoId,
      title,
      ...(description ? { description } : {}),
    };
  }

  if (source.type === "vimeo") {
    const videoId = idFromEmbedUrl(source.embedUrl);
    if (!videoId) return undefined;
    return {
      provider: "vimeo",
      videoId,
      title,
      ...(description ? { description } : {}),
    };
  }

  if (source.type === "file") {
    return {
      provider: "file",
      url: source.url,
      title,
      ...(description ? { description } : {}),
    };
  }

  return undefined;
}

export function mapHomeVideo(
  videoFile: ACFFile | null | undefined,
  videoUrl: string | null | undefined,
  title: string | null,
  description: string | null,
  startSeconds: number | null,
): HomeVideo | undefined {
  const mapped = mapContentVideo(videoFile, videoUrl, title ?? "", description);
  if (!mapped) return undefined;

  return {
    provider: mapped.provider,
    videoId: mapped.videoId,
    url: mapped.url,
    startSeconds: startSeconds ?? undefined,
    title: mapped.title,
    description: mapped.description ?? "",
  };
}
