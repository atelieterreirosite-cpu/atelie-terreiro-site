import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { PublicationGrid } from "@/components/publicacoes/PublicationGrid";
import { PageHero } from "@/components/ui/PageHero";
import { loadPublications } from "@/lib/adapters/publication";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Publicações",
  description: "Publicações do Ateliê Terreiro.",
};

export default async function PublicacoesPage() {
  const collection = await loadPublications();

  return (
    <SiteShell>
      <PageHero title="Publicações" />
      {collection.status === "error" ? (
        <p className="mx-auto max-w-7xl px-6 pb-20 text-sm text-muted md:px-10 md:pb-24">
          Não foi possível carregar as publicações.
        </p>
      ) : (
        <PublicationGrid publications={collection.items} />
      )}
    </SiteShell>
  );
}
