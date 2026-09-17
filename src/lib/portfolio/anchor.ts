import type { PortfolioCategory } from "@/types/views";

/**
 * Gera IDs de âncora estáveis e compatíveis com acentos.
 * Prefere o slug do WordPress quando disponível.
 */
export function slugifyAnchor(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function portfolioItemAnchorId(
  type: PortfolioCategory,
  slug: string,
  title?: string,
): string {
  const fromSlug = slugifyAnchor(slug);
  if (fromSlug) return `${type}-${fromSlug}`;

  const fromTitle = slugifyAnchor(title ?? "");
  if (fromTitle) return `${type}-${fromTitle}`;

  return `${type}-item`;
}
