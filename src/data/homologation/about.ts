import type { AboutPageView } from "@/types/views";

import { homologationImage } from "./images";

/**
 * HOMOLOGATION_FALLBACK — página Sobre.
 *
 * Usado por `src/lib/adapters/about.ts` enquanto a página WP “Sobre” + ACF
 * (spec I.3) não existirem no WordPress e no contrato CMS.
 * Não é conteúdo editorial definitivo.
 */

const HOMOLOGATION =
  "HOMOLOGATION — texto curto para validar a estrutura visual. Substituir pela página WordPress Sobre.";

export const aboutPageContent: AboutPageView = {
  title: "Sobre",
  intro: HOMOLOGATION,

  identity: {
    id: "atelie",
    title: "O Ateliê Terreiro",
    paragraphs: [
      HOMOLOGATION,
      "Bloco de identidade — um ou dois parágrafos virão do ACF da página Sobre.",
    ],
  },

  origin: {
    id: "origem",
    title: "Origem e pensamento",
    paragraphs: [HOMOLOGATION],
  },

  letter: {
    quote: "Citação de homologação para validar a tipografia do bloco da carta.",
    attribution: "Atribuição de exemplo (HOMOLOGATION)",
    note: "Nota curta de homologação.",
  },

  practices: {
    id: "praticas",
    title: "Como atua",
    intro: HOMOLOGATION,
    items: [
      "Grupos de estudos",
      "Laboratórios",
      "Mostras e exposições",
      "Performances",
      "Formação e pesquisa",
      "Intervenções urbanas",
    ],
    note: HOMOLOGATION,
  },

  territory: {
    id: "territorio",
    title: "Território",
    paragraphs: [HOMOLOGATION],
    image: homologationImage("dsc1505", 1),
  },

  luanda: {
    id: "luanda",
    title: "Luanda",
    paragraphs: [HOMOLOGATION],
    image: homologationImage("dsc1515", 2),
  },

  complementary: {
    title: "Currículo e aprofundamento",
    sections: [
      {
        title: "Formação (homologação)",
        items: ["Item de exemplo A", "Item de exemplo B"],
      },
      {
        title: "Exposições (homologação)",
        items: ["Item de exemplo C"],
      },
    ],
  },

  links: [
    { label: "Arquivo", href: "/arquivo/" },
    { label: "Eventos", href: "/eventos/" },
    { label: "Cursos", href: "/cursos/" },
    { label: "Contato", href: "/contato/" },
  ],
};
