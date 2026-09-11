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
      { title: "Grupos de estudos", description: HOMOLOGATION },
      { title: "Laboratórios", description: HOMOLOGATION },
      { title: "Mostras e exposições", description: HOMOLOGATION },
      { title: "Performances", description: HOMOLOGATION },
    ],
    note: HOMOLOGATION,
  },

  territory: {
    id: "territorio",
    title: "Território",
    blocks: [
      {
        paragraphs: [HOMOLOGATION],
        image: homologationImage("dsc1505", 1),
      },
      {
        paragraphs: [HOMOLOGATION],
        image: homologationImage("dsc1515", 2),
      },
      {
        paragraphs: [HOMOLOGATION],
        image: homologationImage("dsc1505", 3),
      },
    ],
  },

  complementary: {
    title: "Currículo e aprofundamento",
    sections: [
      {
        title: "Formação (homologação)",
        description: "Item de exemplo A. Item de exemplo B.",
      },
      {
        title: "Exposições (homologação)",
        description: "Item de exemplo C.",
      },
    ],
  },

  links: [
    { label: "Portfólio", href: "/arquivo/" },
    { label: "Eventos", href: "/eventos/" },
    { label: "Cursos", href: "/cursos/" },
    { label: "Contato", href: "/contato/" },
  ],
};
