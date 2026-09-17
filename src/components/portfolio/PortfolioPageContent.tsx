"use client";

import { useId, useState } from "react";

import type { PortfolioSectionView } from "@/types/views";

import { PortfolioSection } from "./PortfolioSection";
import { PortfolioSidebar } from "./PortfolioSidebar";

interface PortfolioPageContentProps {
  sections: PortfolioSectionView[];
  errors: string[];
}

export function PortfolioPageContent({ sections, errors }: PortfolioPageContentProps) {
  const panelId = useId();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const hasContent = sections.some((section) => section.items.length > 0);
  const hasSidebar = hasContent;

  return (
    <div className="w-full lg:flex lg:items-start lg:gap-6 xl:gap-8">
      {hasSidebar ? (
        <PortfolioSidebar
          sections={sections}
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((open) => !open)}
          panelId={panelId}
        />
      ) : null}

      <div className="min-w-0 flex-1 px-6 pb-24 md:px-10 md:pb-28 lg:pr-10 lg:pl-0 xl:pr-14">
        <div className="sr-only">
          <h1>Portfólio</h1>
        </div>

        {errors.length > 0 ? (
          <p className="mb-10 pt-12 text-sm text-muted md:pt-16 lg:pt-20">
            Não foi possível carregar parte do portfólio.
          </p>
        ) : null}

        {!hasContent && errors.length === 0 ? (
          <p className="pt-12 text-sm text-muted md:pt-16 lg:pt-20">
            Nenhum conteúdo publicado no momento.
          </p>
        ) : null}

        {hasContent ? (
          <div className="space-y-20 pt-12 md:space-y-28 md:pt-16 lg:pt-20">
            {sections.map((section) => (
              <PortfolioSection key={section.id} section={section} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
