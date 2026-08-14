import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { AboutPageContentView } from "@/components/sobre/AboutPageContent";
import { PageHero } from "@/components/ui/PageHero";
import { loadAboutPageForView } from "@/lib/adapters/about";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Identidade, origem e práticas do Ateliê Terreiro.",
};

export default async function SobrePage() {
  const { content } = await loadAboutPageForView();

  return (
    <SiteShell>
      <PageHero title={content.title} intro={content.intro} />
      <AboutPageContentView content={content} />
    </SiteShell>
  );
}
