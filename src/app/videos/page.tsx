import {
  PortfolioMovedPage,
  portfolioMovedMetadata,
} from "@/components/portfolio/PortfolioMovedPage";

export const dynamic = "force-static";

export const metadata = portfolioMovedMetadata("Vídeos", "/portfolio/#videos");

export default function VideosPage() {
  return <PortfolioMovedPage title="Vídeos" href="/portfolio/#videos" />;
}
