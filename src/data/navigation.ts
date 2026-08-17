import type { NavItem } from "@/types/site";

/**
 * Navegação principal — temporária até menu WP / Options (v1: código).
 * Hrefs com trailing slash para compatibilidade com `output: "export"`.
 *
 * Portfólio é agrupador de navegação. A URL `/arquivo/` continua sendo Projetos.
 */
export const portfolioNavigation: NavItem[] = [
  { label: "Projetos", href: "/arquivo/" },
  { label: "Obras", href: "/obras/" },
  { label: "Exposições", href: "/exposicoes/" },
  { label: "Publicações", href: "/publicacoes/" },
  { label: "Vídeos", href: "/videos/" },
];

export const mainNavigation: NavItem[] = [
  { label: "Sobre", href: "/sobre/" },
  { label: "Portfólio", href: "/arquivo/", children: portfolioNavigation },
  { label: "Eventos", href: "/eventos/" },
  { label: "Cursos", href: "/cursos/" },
  { label: "Contato", href: "/contato/" },
];

export function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname || "/";
}

export function isActivePath(pathname: string, href: string): boolean {
  const current = normalizePath(pathname);
  const target = normalizePath(href);

  if (target === "/") {
    return current === "/";
  }

  return current === target || current.startsWith(`${target}/`);
}

export function isNavItemActive(pathname: string, item: NavItem): boolean {
  if (item.children?.length) {
    return item.children.some((child) => isActivePath(pathname, child.href));
  }

  return isActivePath(pathname, item.href);
}
