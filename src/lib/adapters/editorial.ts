import {
  archivePageContent,
  coursesPageContent,
  eventsPageContent,
} from "@/data/homologation/pages";
import { getEditorialPage } from "@/lib/cms/client";
import type { EditorialPageSlug } from "@/lib/cms/models";
import type { ArchivePageView, CoursesPageView, EventsPageView } from "@/types/views";

import { mapImageAssets } from "./media";

/**
 * Adapter das páginas editoriais de listagem:
 * `/atelie/v1/page/arquivo`, `/eventos`, `/cursos`.
 */

export type EditorialPageSource = "cms" | "homologation";

interface IntroPageResult<T> {
  status: "ok";
  source: EditorialPageSource;
  page: T;
}

async function loadIntroPage<T>(
  slug: EditorialPageSlug,
  fallback: T,
  map: (title: string, intro: string) => T,
): Promise<IntroPageResult<T>> {
  try {
    const page = await getEditorialPage(slug);
    return {
      status: "ok",
      source: "cms",
      page: map(page.title, page.intro ?? ""),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[CMS] Falha ao carregar /wp-json/atelie/v1/page/${slug}: ${message}`);
    return { status: "ok", source: "homologation", page: fallback };
  }
}

export async function loadArchivePageForView(): Promise<IntroPageResult<ArchivePageView>> {
  try {
    const page = await getEditorialPage("arquivo");
    return {
      status: "ok",
      source: "cms",
      page: {
        title: page.title,
        intro: page.intro ?? "",
        sliderImages: mapImageAssets(page.sliderImages, page.title),
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[CMS] Falha ao carregar /wp-json/atelie/v1/page/arquivo: ${message}`);
    return { status: "ok", source: "homologation", page: archivePageContent };
  }
}

export function loadEventsPageForView(): Promise<IntroPageResult<EventsPageView>> {
  return loadIntroPage("eventos", eventsPageContent, (title, intro) => ({ title, intro }));
}

export function loadCoursesPageForView(): Promise<IntroPageResult<CoursesPageView>> {
  return loadIntroPage("cursos", coursesPageContent, (title, intro) => ({ title, intro }));
}
