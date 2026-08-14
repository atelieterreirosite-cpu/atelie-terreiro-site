import type { Metadata } from "next";

import { ProjectGrid } from "@/components/arquivo/ProjectGrid";
import { SiteShell } from "@/components/layout/SiteShell";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { PageHero } from "@/components/ui/PageHero";
import { loadArchivePageForView } from "@/lib/adapters/editorial";
import { loadArchiveProjects } from "@/lib/adapters/project";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Arquivo",
  description: "Arquivo da produção coletiva do Ateliê Terreiro.",
};

export default async function ArquivoPage() {
  const [{ page }, collection] = await Promise.all([
    loadArchivePageForView(),
    loadArchiveProjects(),
  ]);

  return (
    <SiteShell>
      <ImageSlider images={page.sliderImages} label="Imagens do arquivo" />
      <PageHero title={page.title} intro={page.intro} />
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
