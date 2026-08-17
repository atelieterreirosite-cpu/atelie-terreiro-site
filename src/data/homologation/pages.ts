import type {
  ArchivePageView,
  ContactPageView,
  CoursesPageView,
  EventsPageView,
} from "@/types/views";

import { homologationImage } from "./images";

const HOMOLOGATION =
  "Texto de homologação para validação de layout — substituir pelo conteúdo do WordPress.";

export const archivePageContent: ArchivePageView = {
  title: "Portfólio",
  intro: HOMOLOGATION,
  sliderImages: [
    homologationImage("dsc1740", 1),
    homologationImage("dsc1706", 2),
    homologationImage("dsc1667", 3),
    homologationImage("dsc1638", 4),
  ],
};

export const eventsPageContent: EventsPageView = {
  title: "Eventos",
  intro: HOMOLOGATION,
};

export const coursesPageContent: CoursesPageView = {
  title: "Cursos",
  intro: HOMOLOGATION,
};

/**
 * HOMOLOGATION_FALLBACK — copy da página Contato (título/intro/nota).
 * Canais (endereço, e-mail, WhatsApp, redes) ficam em `src/data/site.ts`
 * até a Options Page existir. Consumido por `src/lib/adapters/contact.ts`.
 */
export const contactPageContent: ContactPageView = {
  title: "Contato",
  intro: HOMOLOGATION,
  whatsappNote: "HOMOLOGATION — número de exemplo, não é o canal oficial.",
};
