import {
  PortfolioMovedPage,
  portfolioMovedMetadata,
} from "@/components/portfolio/PortfolioMovedPage";

export const dynamic = "force-static";

export const metadata = portfolioMovedMetadata("Portfólio", "/portfolio/");

export default function ArquivoPage() {
  return (
    <PortfolioMovedPage
      title="Portfólio"
      href="/portfolio/"
      description="Os projetos e demais conteúdos do portfólio agora estão reunidos em uma única página."
    />
  );
}
