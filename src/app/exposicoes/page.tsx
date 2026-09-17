import {
  PortfolioMovedPage,
  portfolioMovedMetadata,
} from "@/components/portfolio/PortfolioMovedPage";

export const dynamic = "force-static";

export const metadata = portfolioMovedMetadata("Exposições", "/portfolio/#exposicoes");

export default function ExposicoesPage() {
  return <PortfolioMovedPage title="Exposições" href="/portfolio/#exposicoes" />;
}
