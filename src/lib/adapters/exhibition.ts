import { getExhibitions } from "@/lib/cms/client";
import type { ACFFile, CMSCollection, ExhibitionContent } from "@/lib/cms/models";
import type { ExhibitionView, WorkAttachment } from "@/types/views";

import { formatDisplayDate, formatDisplayPeriod } from "./dates";
import { mapImageAsset } from "./media";

/**
 * Adapter CMS (`ExhibitionContent`) → view-model da UI.
 * Consome apenas `getExhibitions()`. Coleção independente — sem relações.
 */

let exhibitionsPromise: Promise<CMSCollection<ExhibitionView>> | null = null;

function mapAttachment(file: ACFFile | null | undefined): WorkAttachment | undefined {
  if (!file?.url) return undefined;

  const label = file.filename?.trim() || file.title?.trim() || "Abrir anexo";
  return { url: file.url, label };
}

export function mapExhibitionToView(item: ExhibitionContent): ExhibitionView {
  const startDate = formatDisplayDate(item.details.startDate) ?? undefined;
  const endDate = formatDisplayDate(item.details.endDate) ?? undefined;

  return {
    slug: item.slug,
    title: item.content.title,
    period: formatDisplayPeriod(item.details.startDate, item.details.endDate),
    startDate,
    endDate,
    onDisplay: item.details.onDisplay,
    location: item.details.location ?? undefined,
    city: item.details.city ?? undefined,
    curation: item.details.curation ?? undefined,
    artists: item.details.artists ?? undefined,
    excerpt: item.content.summary ?? "",
    descriptionText: item.content.descriptionText,
    featuredImage: mapImageAsset(item.content.image, item.content.title),
    attachment: mapAttachment(item.content.attachment),
    externalLink: item.content.externalLink ?? undefined,
  };
}

export function mapExhibitionsToViews(items: ExhibitionContent[]): ExhibitionView[] {
  // Mantém a ordem do client (`orderby=date&order=desc`).
  return items.map(mapExhibitionToView);
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

/**
 * Isola falha de `getExhibitions()` no espírito de `safeCollection`.
 * Memoizado no processo de build para listagem, params e detalhe.
 */
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
  return collection.items.find((exhibition) => exhibition.slug === slug);
}

export async function getExhibitionSlugsForStaticParams(): Promise<string[]> {
  const collection = await loadExhibitions();
  if (collection.status === "error") return [];
  return collection.items.map((exhibition) => exhibition.slug).filter(Boolean);
}
