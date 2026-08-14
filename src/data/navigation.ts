import type { NavItem } from "@/types/site";

/**
 * Navegação principal — temporária até menu WP / Options (v1: código).
 * Hrefs com trailing slash para compatibilidade com `output: "export"`.
 */
export const mainNavigation: NavItem[] = [
  { label: "Sobre", href: "/sobre/" },
  { label: "Arquivo", href: "/arquivo/" },
  { label: "Eventos", href: "/eventos/" },
  { label: "Cursos", href: "/cursos/" },
  { label: "Contato", href: "/contato/" },
];
