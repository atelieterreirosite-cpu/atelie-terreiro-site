import {
  getExhibitions,
  getProjects,
  getPublications,
  getVideos,
  getWorks,
} from "@/lib/cms/client";
import type { CMSCollection, PortfolioContent } from "@/lib/cms/models";
import { portfolioItemAnchorId } from "@/lib/portfolio/anchor";
import { PORTFOLIO_SECTIONS } from "@/lib/portfolio/sections";
import type {
  PortfolioCaptionedImage,
  PortfolioCaptionedVideo,
  PortfolioItemView,
  PortfolioSectionView,
} from "@/types/views";

import { mapImageAsset } from "./media";
import { mapContentVideo } from "./video";

/**
 * Adapter unificado do Portfólio.
 * Ordem das seções: Obras → Projetos → Exposições → Publicações → Vídeos.
 * Ordem interna: a mesma retornada pela API (`orderby=date&order=desc`).
 */

let portfolioPromise: Promise<{
  sections: PortfolioSectionView[];
  errors: string[];
}> | null = null;

export function mapPortfolioItemToView(item: PortfolioContent): PortfolioItemView {
  const images: PortfolioCaptionedImage[] = item.images.flatMap((entry) => {
    const image = mapImageAsset(entry.image, item.title);
    if (!image) return [];
    return [
      {
        image,
        ...(entry.caption ? { caption: entry.caption } : {}),
      },
    ];
  });

  const videos: PortfolioCaptionedVideo[] = item.videos.flatMap((entry, index) => {
    const video = mapContentVideo(
      entry.videoFile,
      entry.videoUrl,
      `${item.title} — vídeo ${index + 1}`,
    );
    if (!video) return [];
    return [
      {
        video,
        ...(entry.caption ? { caption: entry.caption } : {}),
      },
    ];
  });

  return {
    id: item.id,
    slug: item.slug,
    type: item.type,
    title: item.title,
    descriptionText: item.descriptionText,
    coverImage: mapImageAsset(item.coverImage, item.title),
    ...(item.coverCaption ? { coverCaption: item.coverCaption } : {}),
    images,
    videos,
    anchorId: portfolioItemAnchorId(item.type, item.slug, item.title),
  };
}

function mapPublished(items: PortfolioContent[]): PortfolioItemView[] {
  return items
    .filter((item) => item.status === "publish")
    .map(mapPortfolioItemToView);
}

async function safeLoad(
  endpoint: string,
  loader: () => Promise<PortfolioContent[]>,
): Promise<CMSCollection<PortfolioContent>> {
  try {
    return { endpoint, status: "ok", items: await loader() };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[CMS] Falha ao carregar /wp-json/wp/v2/${endpoint}: ${message}`);
    return { endpoint, status: "error", items: [], error: message };
  }
}

async function fetchPortfolio(): Promise<{
  sections: PortfolioSectionView[];
  errors: string[];
}> {
  const [works, projects, exhibitions, publications, videos] = await Promise.all([
    safeLoad("obra", getWorks),
    safeLoad("projeto", getProjects),
    safeLoad("exposicao", getExhibitions),
    safeLoad("publicacao", getPublications),
    safeLoad("video", getVideos),
  ]);

  const byEndpoint: Record<string, CMSCollection<PortfolioContent>> = {
    obra: works,
    projeto: projects,
    exposicao: exhibitions,
    publicacao: publications,
    video: videos,
  };

  const errors = PORTFOLIO_SECTIONS.flatMap((section) => {
    const collection = byEndpoint[section.endpoint];
    return collection?.status === "error" && collection.error
      ? [`${section.label}: ${collection.error}`]
      : [];
  });

  const sections: PortfolioSectionView[] = PORTFOLIO_SECTIONS.map((section) => ({
    id: section.id,
    type: section.type,
    label: section.label,
    items: mapPublished(byEndpoint[section.endpoint]?.items ?? []),
  }));

  return { sections, errors };
}

export function loadPortfolio(): Promise<{
  sections: PortfolioSectionView[];
  errors: string[];
}> {
  if (!portfolioPromise) {
    portfolioPromise = fetchPortfolio();
  }
  return portfolioPromise;
}
