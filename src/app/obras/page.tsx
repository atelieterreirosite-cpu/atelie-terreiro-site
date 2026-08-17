import type { Metadata } from "next";

import { WorkGrid } from "@/components/obras/WorkGrid";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { loadWorks } from "@/lib/adapters/work";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Obras",
  description: "Obras do acervo do Ateliê Terreiro.",
};

export default async function ObrasPage() {
  const collection = await loadWorks();

  return (
    <SiteShell>
      <PageHero title="Obras" />
      {collection.status === "error" ? (
        <p className="mx-auto max-w-7xl px-6 pb-20 text-sm text-muted md:px-10 md:pb-24">
          Não foi possível carregar as obras.
        </p>
      ) : (
        <WorkGrid works={collection.items} />
      )}
    </SiteShell>
  );
}
