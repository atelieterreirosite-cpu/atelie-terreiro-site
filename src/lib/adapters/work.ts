import { getWorks } from "@/lib/cms/client";
import type { ACFFile, CMSCollection, WorkContent } from "@/lib/cms/models";
import type { WorkAttachment, WorkView } from "@/types/views";

import { mapImageAsset } from "./media";
import { mapContentVideo } from "./video";

/**
 * Adapter CMS (`WorkContent`) → view-model da UI.
 * Consome apenas `getWorks()`. Coleção independente — sem relações.
 */

let worksPromise: Promise<CMSCollection<WorkView>> | null = null;

function workSortYear(item: WorkContent): number {
  const fromYear = Number.parseInt(item.details.year ?? "", 10);
  if (Number.isFinite(fromYear)) return fromYear;

  const fromDate = new Date(item.date).getFullYear();
  return Number.isFinite(fromDate) ? fromDate : 0;
}

function mapAttachment(file: ACFFile | null | undefined): WorkAttachment | undefined {
  if (!file?.url) return undefined;

  const label = file.filename?.trim() || file.title?.trim() || "Abrir anexo";
  return { url: file.url, label };
}

export function mapWorkToView(item: WorkContent): WorkView {
  return {
    slug: item.slug,
    title: item.content.title,
    artist: item.details.artist ?? undefined,
    year: item.details.year ?? undefined,
    technique: item.details.technique ?? undefined,
    dimensions: item.details.dimensions ?? undefined,
    excerpt: item.content.summary ?? "",
    descriptionText: item.content.descriptionText,
    credits: item.details.credits ?? undefined,
    featuredImage: mapImageAsset(item.content.image, item.content.title),
    video: mapContentVideo(item.details.videoFile, item.details.videoUrl, item.content.title),
    attachment: mapAttachment(item.content.attachment),
    externalLink: item.content.externalLink ?? undefined,
  };
}

export function mapWorksToViews(items: WorkContent[]): WorkView[] {
  return [...items]
    .sort((a, b) => workSortYear(b) - workSortYear(a))
    .map(mapWorkToView);
}

async function fetchWorks(): Promise<CMSCollection<WorkView>> {
  try {
    const items = await getWorks();
    return {
      endpoint: "obra",
      status: "ok",
      items: mapWorksToViews(items),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[CMS] Falha ao carregar /wp-json/wp/v2/obra: ${message}`);
    return { endpoint: "obra", status: "error", items: [], error: message };
  }
}

/**
 * Isola falha de `getWorks()` no espírito de `safeCollection`.
 * Memoizado no processo de build para listagem, params e detalhe.
 */
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
  const collection = await loadWorks();
  if (collection.status === "error") return [];
  return collection.items.map((work) => work.slug).filter(Boolean);
}
