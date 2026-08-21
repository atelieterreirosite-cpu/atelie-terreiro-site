import type { Metadata } from "next";

import { TeamHero } from "@/components/equipe/TeamHero";
import { TeamSection } from "@/components/equipe/TeamSection";
import { SiteShell } from "@/components/layout/SiteShell";
import { loadTeam } from "@/lib/adapters/team";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Equipe",
  description: "Pessoas que fazem o Ateliê Terreiro acontecer, pensar e construir.",
};

export default async function EquipePage() {
  const collection = await loadTeam();

  return (
    <SiteShell>
      <TeamHero
        title="Equipe"
        text={"Pessoas que fazem o Ateliê Terreiro\nacontecer, pensar e construir."}
      />
      {collection.status === "error" ? (
        <p className="mx-auto max-w-7xl px-6 py-16 text-sm text-muted md:px-10 md:py-24">
          Não foi possível carregar a equipe.
        </p>
      ) : collection.items.length === 0 ? (
        <p className="mx-auto max-w-7xl px-6 py-16 text-sm text-muted md:px-10 md:py-24">
          Nenhum integrante para exibir.
        </p>
      ) : (
        <TeamSection members={collection.items} />
      )}
    </SiteShell>
  );
}
