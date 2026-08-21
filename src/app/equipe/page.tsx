import type { Metadata } from "next";

import { TeamHero } from "@/components/equipe/TeamHero";
import { TeamSection } from "@/components/equipe/TeamSection";
import { SiteShell } from "@/components/layout/SiteShell";
import { teamMembersMock, teamPageIntro } from "@/data/equipe";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Equipe",
  description: "Pessoas que fazem o Ateliê Terreiro acontecer, pensar e construir.",
};

export default function EquipePage() {
  return (
    <SiteShell>
      <TeamHero title={teamPageIntro.title} text={teamPageIntro.text} />
      <TeamSection members={teamMembersMock} />
    </SiteShell>
  );
}
