import type { PortfolioCategory } from "@/types/views";

/**
 * Ordem DEFINITIVA das seções do Portfólio.
 * Usar em página, sidebar, menu e anchors — nunca outra ordem.
 */
export const PORTFOLIO_SECTIONS = [
  {
    type: "obra" as const satisfies PortfolioCategory,
    id: "obras",
    label: "Obras",
    endpoint: "obra",
  },
  {
    type: "projeto" as const satisfies PortfolioCategory,
    id: "projetos",
    label: "Projetos",
    endpoint: "projeto",
  },
  {
    type: "exposicao" as const satisfies PortfolioCategory,
    id: "exposicoes",
    label: "Exposições",
    endpoint: "exposicao",
  },
  {
    type: "publicacao" as const satisfies PortfolioCategory,
    id: "publicacoes",
    label: "Publicações",
    endpoint: "publicacao",
  },
  {
    type: "video" as const satisfies PortfolioCategory,
    id: "videos",
    label: "Vídeos",
    endpoint: "video",
  },
] as const;

export type PortfolioSectionConfig = (typeof PORTFOLIO_SECTIONS)[number];
