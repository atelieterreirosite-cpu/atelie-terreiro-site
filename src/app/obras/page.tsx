import {
  PortfolioMovedPage,
  portfolioMovedMetadata,
} from "@/components/portfolio/PortfolioMovedPage";

export const dynamic = "force-static";

export const metadata = portfolioMovedMetadata("Obras", "/portfolio/#obras");

export default function ObrasPage() {
  return <PortfolioMovedPage title="Obras" href="/portfolio/#obras" />;
}
