import type { MetadataRoute } from "next";

import { getCourseSlugsForStaticParams } from "@/lib/adapters/course";
import { getEventSlugsForStaticParams } from "@/lib/adapters/event";
import { absoluteUrl } from "@/lib/seo/site";

export const dynamic = "force-static";

const STATIC_PATHS = [
  "/",
  "/sobre/",
  "/portfolio/",
  "/eventos/",
  "/cursos/",
  "/equipe/",
  "/contato/",
] as const;

/**
 * Sitemap do frontend público (static export).
 * Portfólio é uma única página; slugs individuais de CPTs de arquivo saíram do fluxo.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [events, courses] = await Promise.all([
    getEventSlugsForStaticParams(),
    getCourseSlugsForStaticParams(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
  }));

  const dynamicEntries: MetadataRoute.Sitemap = [
    ...events.map((slug) => ({ url: absoluteUrl(`/eventos/${slug}/`) })),
    ...courses.map((slug) => ({ url: absoluteUrl(`/cursos/${slug}/`) })),
  ];

  return [...staticEntries, ...dynamicEntries];
}
