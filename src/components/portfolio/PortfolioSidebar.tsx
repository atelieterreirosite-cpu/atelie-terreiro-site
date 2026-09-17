"use client";

import Link from "next/link";
import { useId, useState } from "react";

import type { PortfolioSectionView } from "@/types/views";

interface PortfolioSidebarProps {
  sections: PortfolioSectionView[];
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      width="10"
      height="10"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2.5 4.25 6 7.75l3.5-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

/**
 * Índice lateral do Portfólio — expandir/recolher por categoria + âncoras.
 * No mobile: painel recolhível no topo do conteúdo.
 */
export function PortfolioSidebar({ sections }: PortfolioSidebarProps) {
  const baseId = useId();
  const navSections = sections.filter((section) => section.items.length > 0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(navSections.map((section) => [section.id, true])),
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  if (navSections.length === 0) {
    return null;
  }

  const nav = (
    <nav aria-label="Índice do portfólio" className="space-y-5">
      <p className="text-xs tracking-[0.15em] text-muted-light uppercase">Portfólio</p>

      <ul className="space-y-4">
        {navSections.map((section) => {
          const panelId = `${baseId}-${section.id}`;
          const isOpen = expanded[section.id] ?? true;

          return (
            <li key={section.id}>
              <div className="flex items-start gap-2">
                <Link
                  href={`/portfolio/#${section.id}`}
                  className="min-w-0 flex-1 text-left text-xs tracking-[0.12em] text-foreground/85 uppercase transition-colors duration-300 hover:text-foreground motion-reduce:transition-none"
                >
                  {section.label}
                </Link>
                <button
                  type="button"
                  className="touch-target -mr-2 -mt-1 flex items-center justify-center text-muted hover:text-foreground"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-label={
                    isOpen
                      ? `Recolher ${section.label}`
                      : `Expandir ${section.label}`
                  }
                  onClick={() =>
                    setExpanded((current) => ({
                      ...current,
                      [section.id]: !isOpen,
                    }))
                  }
                >
                  <Chevron open={isOpen} />
                </button>
              </div>

              <ul
                id={panelId}
                className={`mt-2 space-y-1.5 border-l border-border/70 pl-3 ${isOpen ? "" : "hidden"}`}
                hidden={!isOpen}
              >
                {section.items.map((item) => (
                  <li key={item.anchorId}>
                    <Link
                      href={`/portfolio/#${item.anchorId}`}
                      className="block py-0.5 text-sm leading-snug text-muted transition-colors duration-300 hover:text-foreground motion-reduce:transition-none"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      <div className="border-b border-border lg:hidden">
        <button
          type="button"
          className="flex w-full items-center justify-between px-6 py-4 text-left text-xs tracking-[0.15em] text-foreground uppercase md:px-10"
          aria-expanded={mobileOpen}
          aria-controls={`${baseId}-mobile-panel`}
          onClick={() => setMobileOpen((open) => !open)}
        >
          Índice
          <Chevron open={mobileOpen} />
        </button>
        <div
          id={`${baseId}-mobile-panel`}
          className={`px-6 pb-6 md:px-10 ${mobileOpen ? "" : "hidden"}`}
          hidden={!mobileOpen}
        >
          {nav}
        </div>
      </div>

      <aside className="hidden lg:block lg:w-56 xl:w-64 lg:shrink-0">
        <div className="sticky top-[calc(var(--header-height)+1.5rem)] max-h-[calc(100vh-var(--header-height)-3rem)] overflow-y-auto pr-2 scrollbar-thin">
          {nav}
        </div>
      </aside>
    </>
  );
}
