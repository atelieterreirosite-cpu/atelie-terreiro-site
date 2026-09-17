import type { PortfolioSectionView } from "@/types/views";

import { PortfolioEntry } from "./PortfolioEntry";

interface PortfolioSectionProps {
  section: PortfolioSectionView;
}

export function PortfolioSection({ section }: PortfolioSectionProps) {
  if (section.items.length === 0) {
    return null;
  }

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-[calc(var(--header-height)+1.5rem)] space-y-4 md:space-y-6"
    >
      <h2
        id={`${section.id}-heading`}
        className="text-xs tracking-[0.15em] text-muted-light uppercase"
      >
        {section.label}
      </h2>

      <div className="space-y-4 md:space-y-6">
        {section.items.map((item) => (
          <PortfolioEntry key={item.anchorId} item={item} />
        ))}
      </div>
    </section>
  );
}
