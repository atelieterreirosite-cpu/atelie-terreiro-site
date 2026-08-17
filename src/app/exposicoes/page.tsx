import type { Metadata } from "next";

import { ExhibitionList } from "@/components/exposicoes/ExhibitionList";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { loadExhibitions } from "@/lib/adapters/exhibition";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Exposições",
  description: "Exposições do Ateliê Terreiro.",
};

export default async function ExposicoesPage() {
  const collection = await loadExhibitions();

  return (
    <SiteShell>
      <PageHero title="Exposições" />
      {collection.status === "error" ? (
        <p className="mx-auto max-w-4xl px-6 pb-20 text-sm text-muted md:px-10 md:pb-24">
          Não foi possível carregar as exposições.
        </p>
      ) : (
        <ExhibitionList exhibitions={collection.items} />
      )}
    </SiteShell>
  );
}
