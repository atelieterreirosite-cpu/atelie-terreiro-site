import type { PortfolioSectionView } from "@/types/views";

import { PortfolioSection } from "./PortfolioSection";
import { PortfolioSidebar } from "./PortfolioSidebar";

interface PortfolioPageContentProps {
  sections: PortfolioSectionView[];
  errors: string[];
}

export function PortfolioPageContent({ sections, errors }: PortfolioPageContentProps) {
  const hasContent = sections.some((section) => section.items.length > 0);

  return (
    <div className="mx-auto max-w-7xl lg:flex lg:items-start lg:gap-10 xl:gap-14">
      <PortfolioSidebar sections={sections} />

      <div className="min-w-0 flex-1 px-6 pb-24 md:px-10 md:pb-28 lg:pl-0">
        <header className="scroll-mt-[calc(var(--header-height)+1.5rem)] py-12 md:py-16 lg:py-20">
          <h1 className="font-display text-xl leading-tight font-light tracking-wide text-balance sm:text-2xl md:text-3xl lg:text-4xl">
            Portfólio
          </h1>
        </header>

        {errors.length > 0 ? (
          <p className="mb-10 text-sm text-muted">
            Não foi possível carregar parte do portfólio.
          </p>
        ) : null}

        {!hasContent && errors.length === 0 ? (
          <p className="text-sm text-muted">Nenhum conteúdo publicado no momento.</p>
        ) : null}

        {hasContent ? (
          <div className="space-y-20 md:space-y-28">
            {sections.map((section) => (
              <PortfolioSection key={section.id} section={section} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
