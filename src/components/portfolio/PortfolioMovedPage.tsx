import type { Metadata } from "next";
import Link from "next/link";

import { SiteShell } from "@/components/layout/SiteShell";

interface PortfolioMovedPageProps {
  title: string;
  href: string;
  description?: string;
}

export function portfolioMovedMetadata(title: string, canonical: string): Metadata {
  return {
    title,
    robots: { index: false, follow: true },
    alternates: { canonical },
  };
}

/**
 * Rotas antigas de listagem/detalhe do Portfólio.
 * Mantidas fora da navegação; apontam para `/portfolio/`.
 */
export function PortfolioMovedPage({
  title,
  href,
  description = "Este conteúdo agora faz parte da página Portfólio.",
}: PortfolioMovedPageProps) {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
        <h1 className="font-display text-xl font-light tracking-wide sm:text-2xl">{title}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
        <p className="mt-8">
          <Link
            href={href}
            className="link-underline text-sm tracking-[0.12em] uppercase"
          >
            Ir para o Portfólio
          </Link>
        </p>
      </div>
    </SiteShell>
  );
}
