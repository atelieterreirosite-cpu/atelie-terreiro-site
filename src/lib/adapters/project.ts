import { getProjects } from "@/lib/cms/client";
import type { CMSCollection, PortfolioContent } from "@/lib/cms/models";
import type { ProjectView } from "@/types/views";

import { mapImageAsset } from "./media";
import { mapContentVideo } from "./video";

/**
 * Adapter legado de Projetos — mantido para componentes antigos não referenciados
 * pela navegação. A experiência pública usa `loadPortfolio()`.
 */

let projectsPromise: Promise<CMSCollection<ProjectView>> | null = null;

export function mapProjectToView(item: PortfolioContent): ProjectView {
  const firstVideo = item.videos[0];

  return {
    slug: item.slug,
    title: item.title,
    period: "",
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

export function mapProjectsToViews(items: PortfolioContent[]): ProjectView[] {
  return items.filter((item) => item.status === "publish").map(mapProjectToView);
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
  return [];
}
