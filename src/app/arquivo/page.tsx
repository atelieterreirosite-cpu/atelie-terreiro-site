import type { Metadata } from "next";

import { ProjectGrid } from "@/components/arquivo/ProjectGrid";
import { SiteShell } from "@/components/layout/SiteShell";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { PageHero } from "@/components/ui/PageHero";
import { loadArchivePageForView } from "@/lib/adapters/editorial";
import { loadArchiveProjects } from "@/lib/adapters/project";

export const dynamic = "force-static";

/** Rótulo público da área; a URL e o slug editorial permanecem `/arquivo/`. */
const PORTFOLIO_TITLE = "Portfólio";

function portfolioDescription(intro: string): string {
  const fromCms = intro.trim().replace(/\s+/g, " ");
  if (fromCms) return fromCms;
  return "Portfólio da produção coletiva do Ateliê Terreiro.";
}

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await loadArchivePageForView();

  return {
    title: PORTFOLIO_TITLE,
    description: portfolioDescription(page.intro),
  };
}

export default async function ArquivoPage() {
  const [{ page }, collection] = await Promise.all([
    loadArchivePageForView(),
    loadArchiveProjects(),
  ]);

  return (
    <SiteShell>
      <ImageSlider images={page.sliderImages} label="Imagens do portfólio" />
      <PageHero kicker="Projetos" title={PORTFOLIO_TITLE} intro={page.intro} />
      {collection.status === "error" ? (
        <p className="mx-auto max-w-7xl px-6 pb-20 text-sm text-muted md:px-10 md:pb-24">
          Não foi possível carregar os projetos.
        </p>
      ) : (
        <ProjectGrid projects={collection.items} />
      )}
    </SiteShell>
  );
}
