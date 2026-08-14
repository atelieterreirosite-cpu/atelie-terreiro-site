import { getProjects } from "@/lib/cms/client";
import type { CMSCollection, ProjectContent } from "@/lib/cms/models";
import type { ProjectView } from "@/types/views";

import { mapImageAsset, mapImageAssets } from "./media";
import { mapContentVideo } from "./video";

/**
 * Adapter CMS (`ProjectContent`) → view-model da UI.
 * Consome apenas `getProjects()`. Coleção independente — sem relações.
 */

let projectsPromise: Promise<CMSCollection<ProjectView>> | null = null;

function projectSortYear(item: ProjectContent): number {
  const fromStart = Number.parseInt(item.details.startYear ?? "", 10);
  if (Number.isFinite(fromStart)) return fromStart;

  const fromDate = new Date(item.date).getFullYear();
  return Number.isFinite(fromDate) ? fromDate : 0;
}

function formatPeriod(item: ProjectContent): string {
  const start = item.details.startYear;
  const end = item.details.endYear;

  if (start && end) return `${start}–${end}`;
  if (start && item.details.ongoing) return `${start}–`;
  if (start) return start;
  if (end) return end;
  return "";
}

export function mapProjectToView(item: ProjectContent): ProjectView {
  return {
    slug: item.slug,
    title: item.content.title,
    period: formatPeriod(item),
    status: item.details.ongoing ? "continuo" : "encerrado",
    excerpt: item.content.summary ?? "",
    descriptionText: item.content.descriptionText,
    featuredImage: mapImageAsset(item.content.image, item.content.title),
    gallery: mapImageAssets(item.details.gallery, item.content.title),
    video: mapContentVideo(item.details.videoFile, item.details.videoUrl, item.content.title),
    participants: item.details.participants ?? undefined,
    curation: item.details.curation ?? undefined,
    location: item.details.location ?? undefined,
  };
}

export function mapProjectsToViews(items: ProjectContent[]): ProjectView[] {
  return [...items]
    .sort((a, b) => projectSortYear(b) - projectSortYear(a))
    .map(mapProjectToView);
}

async function fetchArchiveProjects(): Promise<CMSCollection<ProjectView>> {
  try {
    const items = await getProjects();
    return {
      endpoint: "projeto",
      status: "ok",
      items: mapProjectsToViews(items),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[CMS] Falha ao carregar /wp-json/wp/v2/projeto: ${message}`);
    return { endpoint: "projeto", status: "error", items: [], error: message };
  }
}

/**
 * Isola falha de `getProjects()` no espírito de `safeCollection`.
 * Memoizado no processo de build para listagem, params e detalhe.
 */
export function loadArchiveProjects(): Promise<CMSCollection<ProjectView>> {
  if (!projectsPromise) {
    projectsPromise = fetchArchiveProjects();
  }
  return projectsPromise;
}

export async function getProjectBySlugForView(slug: string): Promise<ProjectView | undefined> {
  const collection = await loadArchiveProjects();
  return collection.items.find((project) => project.slug === slug);
}

export async function getProjectSlugsForStaticParams(): Promise<string[]> {
  const collection = await loadArchiveProjects();
  if (collection.status === "error") return [];
  return collection.items.map((project) => project.slug).filter(Boolean);
}
