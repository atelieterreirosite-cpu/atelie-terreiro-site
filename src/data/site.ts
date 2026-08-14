import type { SiteInfo } from "@/types/site";

/**
 * TEMPORARY_SITE / pré-Options.
 *
 * Dados globais temporários para Header, Footer e Contato.
 * Destino: Options Page do WordPress (spec I.1) via adapter `site.ts`.
 * NÃO tratar como conteúdo editorial definitivo.
 * WhatsApp aqui é número de exemplo — não é o canal oficial.
 */
export const siteInfo: SiteInfo = {
  name: "Ateliê Terreiro",
  tagline: "Plataforma de arte coletiva contemporânea",
  address: {
    street: "Rua Acre, nº 83, sala 505",
    neighborhood: "Saúde",
    city: "Rio de Janeiro",
    region: "Pequena África",
  },
  social: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/atelieterreiro/",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/atelieterreiro/",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@atelieterreiro5653",
    },
    {
      label: "Vimeo",
      href: "https://vimeo.com/user134238188",
    },
  ],
  contact: {
    email: "atelieterreiro@gmail.com",
    whatsapp: {
      display: "WhatsApp — número de exemplo (temporário)",
      href: "https://wa.me/5500000000000",
    },
  },
};
