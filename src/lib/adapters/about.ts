import { aboutPageContent } from "@/data/homologation/about";
import { getEditorialPage } from "@/lib/cms/client";
import type { EditorialPageContent } from "@/lib/cms/models";
import type {
  AboutBlock,
  AboutPageView,
  TerritoryBlock,
  TerritorySectionView,
} from "@/types/views";

import { mapImageAsset } from "./media";

/**
 * Adapter da página Sobre (`/atelie/v1/page/sobre`).
 * Campos vazios não são preenchidos com mock. Fallback só se o endpoint falhar.
 * `luanda_*` permanece no CMS bruto, mas não entra no view-model da Sobre.
 */

export type AboutDataSource = "cms" | "homologation";

export interface AboutPageResult {
  status: "ok";
  source: AboutDataSource;
  content: AboutPageView;
}

function mapBlock(
  id: string,
  title: string | null,
  paragraphs: string[],
  image?: ReturnType<typeof mapImageAsset>,
): AboutBlock | undefined {
  if (!title && paragraphs.length === 0 && !image) return undefined;

  return {
    id,
    title: title ?? "",
    paragraphs,
    ...(image ? { image } : {}),
  };
}

function mapTerritoryBlock(
  paragraphs: string[],
  image: ReturnType<typeof mapImageAsset>,
): TerritoryBlock | undefined {
  if (paragraphs.length === 0 && !image) return undefined;

  return {
    paragraphs,
    ...(image ? { image } : {}),
  };
}

function mapTerritorySection(page: EditorialPageContent): TerritorySectionView | undefined {
  const fallbackAlt = page.territoryTitle || page.title;
  const blocks = [
    mapTerritoryBlock(
      page.territoryParagraphs,
      mapImageAsset(page.territoryImage, fallbackAlt),
    ),
    mapTerritoryBlock(
      page.territoryParagraphs2,
      mapImageAsset(page.territoryImage2, `${fallbackAlt} 2`),
    ),
    mapTerritoryBlock(
      page.territoryParagraphs3,
      mapImageAsset(page.territoryImage3, `${fallbackAlt} 3`),
    ),
  ].filter((block): block is TerritoryBlock => block !== undefined);

  if (!page.territoryTitle && blocks.length === 0) return undefined;

  return {
    id: "territorio",
    title: page.territoryTitle ?? "",
    blocks,
  };
}

function mapAboutPage(page: EditorialPageContent): AboutPageView {
  const practices =
    page.practicesTitle ||
    page.practicesIntro ||
    page.practicesItems.length > 0 ||
    page.practicesNote
      ? {
          id: "praticas",
          title: page.practicesTitle ?? "",
          intro: page.practicesIntro ?? "",
          items: page.practicesItems,
          note: page.practicesNote ?? "",
        }
      : undefined;

  const complementary =
    page.complementaryTitle || page.complementarySections.length > 0
      ? {
          title: page.complementaryTitle ?? "",
          sections: page.complementarySections,
        }
      : undefined;

  return {
    title: page.title,
    intro: page.intro ?? "",
    identity: mapBlock("atelie", page.identityTitle, page.identityParagraphs),
    origin: mapBlock("origem", page.originTitle, page.originParagraphs),
    letter: page.letterQuote
      ? {
          quote: page.letterQuote,
          attribution: page.letterAttribution ?? "",
          ...(page.letterNote ? { note: page.letterNote } : {}),
        }
      : undefined,
    practices,
    territory: mapTerritorySection(page),
    complementary,
    links: page.pageLinks.map((link) => ({ label: link.label, href: link.url })),
  };
}

export async function loadAboutPageForView(): Promise<AboutPageResult> {
  try {
    const page = await getEditorialPage("sobre");
    return {
      status: "ok",
      source: "cms",
      content: mapAboutPage(page),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[CMS] Falha ao carregar /wp-json/atelie/v1/page/sobre: ${message}`);
    return {
      status: "ok",
      source: "homologation",
      content: aboutPageContent,
    };
  }
}
