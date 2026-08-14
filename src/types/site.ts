/**
 * Tipos mínimos de apresentação do site (shell / navegação).
 * Conteúdo editorial definitivo virá de Options Page / páginas WP.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteAddress {
  street: string;
  neighborhood: string;
  city: string;
  region: string;
}

export interface SiteContact {
  email: string;
  whatsapp: {
    display: string;
    href: string;
  };
}

export interface SiteInfo {
  name: string;
  tagline: string;
  address: SiteAddress;
  social: SocialLink[];
  contact: SiteContact;
}
