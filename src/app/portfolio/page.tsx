import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { PortfolioHashScroll } from "@/components/portfolio/PortfolioHashScroll";
import { PortfolioPageContent } from "@/components/portfolio/PortfolioPageContent";
import { loadPortfolio } from "@/lib/adapters/portfolio";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Portfólio",
  description: "Portfólio da produção coletiva do Ateliê Terreiro.",
  alternates: {
    canonical: "/portfolio/",
  },
};

export default async function PortfolioPage() {
  const { sections, errors } = await loadPortfolio();

  return (
    <SiteShell>
      <PortfolioHashScroll />
      <PortfolioPageContent sections={sections} errors={errors} />
    </SiteShell>
  );
}
