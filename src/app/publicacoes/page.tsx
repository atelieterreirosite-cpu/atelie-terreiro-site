import {
  PortfolioMovedPage,
  portfolioMovedMetadata,
} from "@/components/portfolio/PortfolioMovedPage";

export const dynamic = "force-static";

export const metadata = portfolioMovedMetadata("Publicações", "/portfolio/#publicacoes");

export default function PublicacoesPage() {
  return <PortfolioMovedPage title="Publicações" href="/portfolio/#publicacoes" />;
}
