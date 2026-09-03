import type { MetadataRoute } from "next";

import { getCourseSlugsForStaticParams } from "@/lib/adapters/course";
import { getEventSlugsForStaticParams } from "@/lib/adapters/event";
import { getExhibitionSlugsForStaticParams } from "@/lib/adapters/exhibition";
import { getProjectSlugsForStaticParams } from "@/lib/adapters/project";
import { getPublicationSlugsForStaticParams } from "@/lib/adapters/publication";
import { getVideoSlugsForStaticParams } from "@/lib/adapters/videos";
import { getWorkSlugsForStaticParams } from "@/lib/adapters/work";
import { absoluteUrl } from "@/lib/seo/site";

export const dynamic = "force-static";

const STATIC_PATHS = [
  "/",
  "/sobre/",
  "/arquivo/",
  "/obras/",
  "/exposicoes/",
  "/publicacoes/",
  "/videos/",
  "/eventos/",
  "/cursos/",
  "/equipe/",
  "/contato/",
] as const;

/**
 * Sitemap do frontend público (static export).
 * Slugs dinâmicos reutilizam a mesma fonte de `generateStaticParams`.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, works, exhibitions, publications, videos, events, courses] =
    await Promise.all([
      getProjectSlugsForStaticParams(),
      getWorkSlugsForStaticParams(),
      getExhibitionSlugsForStaticParams(),
      getPublicationSlugsForStaticParams(),
      getVideoSlugsForStaticParams(),
      getEventSlugsForStaticParams(),
      getCourseSlugsForStaticParams(),
    ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
  }));

  const dynamicEntries: MetadataRoute.Sitemap = [
    ...projects.map((slug) => ({ url: absoluteUrl(`/arquivo/${slug}/`) })),
    ...works.map((slug) => ({ url: absoluteUrl(`/obras/${slug}/`) })),
    ...exhibitions.map((slug) => ({ url: absoluteUrl(`/exposicoes/${slug}/`) })),
    ...publications.map((slug) => ({ url: absoluteUrl(`/publicacoes/${slug}/`) })),
    ...videos.map((slug) => ({ url: absoluteUrl(`/videos/${slug}/`) })),
    ...events.map((slug) => ({ url: absoluteUrl(`/eventos/${slug}/`) })),
    ...courses.map((slug) => ({ url: absoluteUrl(`/cursos/${slug}/`) })),
  ];

  return [...staticEntries, ...dynamicEntries];
}
