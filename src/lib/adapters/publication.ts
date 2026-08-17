import { getPublications } from "@/lib/cms/client";
import type { ACFFile, CMSCollection, PublicationContent } from "@/lib/cms/models";
import type { PublicationView, WorkAttachment } from "@/types/views";

import { mapImageAsset } from "./media";

/**
 * Adapter CMS (`PublicationContent`) → view-model da UI.
 * Consome apenas `getPublications()`. Coleção independente — sem relações.
 */

let publicationsPromise: Promise<CMSCollection<PublicationView>> | null = null;

function publicationSortYear(item: PublicationContent): number {
  const fromYear = Number.parseInt(item.details.year ?? "", 10);
  if (Number.isFinite(fromYear)) return fromYear;

  const fromDate = new Date(item.date).getFullYear();
  return Number.isFinite(fromDate) ? fromDate : 0;
}

function mapAttachment(file: ACFFile | null | undefined): WorkAttachment | undefined {
  if (!file?.url) return undefined;

  const label = file.filename?.trim() || file.title?.trim() || "Abrir publicação";
  return { url: file.url, label };
}

export function mapPublicationToView(item: PublicationContent): PublicationView {
  return {
    slug: item.slug,
    title: item.content.title,
    publicationType: item.details.publicationType ?? undefined,
    authors: item.details.authors ?? undefined,
    year: item.details.year ?? undefined,
    excerpt: item.content.summary ?? "",
    descriptionText: item.content.descriptionText,
    credits: item.details.credits ?? undefined,
    featuredImage: mapImageAsset(item.content.image, item.content.title),
    attachment: mapAttachment(item.content.attachment),
    externalLink: item.content.externalLink ?? undefined,
  };
}

export function mapPublicationsToViews(items: PublicationContent[]): PublicationView[] {
  return [...items]
    .sort((a, b) => publicationSortYear(b) - publicationSortYear(a))
    .map(mapPublicationToView);
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

/**
 * Isola falha de `getPublications()` no espírito de `safeCollection`.
 * Memoizado no processo de build para listagem, params e detalhe.
 */
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
  return collection.items.find((publication) => publication.slug === slug);
}

export async function getPublicationSlugsForStaticParams(): Promise<string[]> {
  const collection = await loadPublications();
  if (collection.status === "error") return [];
  return collection.items.map((publication) => publication.slug).filter(Boolean);
}
