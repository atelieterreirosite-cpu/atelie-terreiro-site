import type { NavItem } from "@/types/site";

/**
 * Navegação principal — temporária até menu WP / Options (v1: código).
 * Hrefs com trailing slash para compatibilidade com `output: "export"`.
 *
 * Portfólio aponta para `/portfolio/`. Subitens usam hash das seções.
 * Ordem DEFINITIVA: Obras → Projetos → Exposições → Publicações → Vídeos.
 */
export const portfolioNavigation: NavItem[] = [
  { label: "Obras", href: "/portfolio/#obras" },
  { label: "Projetos", href: "/portfolio/#projetos" },
  { label: "Exposições", href: "/portfolio/#exposicoes" },
  { label: "Publicações", href: "/portfolio/#publicacoes" },
  { label: "Vídeos", href: "/portfolio/#videos" },
];

export const mainNavigation: NavItem[] = [
  { label: "Sobre", href: "/sobre/" },
  { label: "Portfólio", href: "/portfolio/", children: portfolioNavigation },
  { label: "Eventos", href: "/eventos/" },
  { label: "Cursos", href: "/cursos/" },
  { label: "Equipe", href: "/equipe/" },
  { label: "Contato", href: "/contato/" },
];

export function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname || "/";
}

/** Remove hash/query para comparação de path ativo. */
export function hrefPathname(href: string): string {
  const withoutQuery = href.split("?")[0] ?? href;
  const withoutHash = withoutQuery.split("#")[0] || "/";
  return normalizePath(withoutHash);
}

export function isActivePath(pathname: string, href: string): boolean {
  const current = normalizePath(pathname);
  const target = hrefPathname(href);

  if (target === "/") {
    return current === "/";
  }

  return current === target || current.startsWith(`${target}/`);
}

export function isNavItemActive(pathname: string, item: NavItem): boolean {
  if (isActivePath(pathname, item.href)) {
    return true;
  }

  if (item.children?.length) {
    return item.children.some((child) => isActivePath(pathname, child.href));
  }

  return false;
}
