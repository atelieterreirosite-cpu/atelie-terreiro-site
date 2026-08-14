import { contactPageContent } from "@/data/homologation/pages";
import { getEditorialPage } from "@/lib/cms/client";
import type { SiteInfo } from "@/types/site";
import type { ContactPageView } from "@/types/views";

import { getSiteDataSource, loadSiteInfoForView, type SiteDataSource } from "./site";

/**
 * Adapter da página Contato (`/atelie/v1/page/contato`) + Options para canais.
 * Formulário de contato permanece fora do escopo.
 */

export type ContactPageSource = "cms" | "homologation";

export interface ContactPageResult {
  status: "ok";
  pageSource: ContactPageSource;
  channelsSource: SiteDataSource;
  page: ContactPageView;
  site: SiteInfo;
}

export async function loadContactPageForView(): Promise<ContactPageResult> {
  const [site, channelsSource, editorial] = await Promise.all([
    loadSiteInfoForView(),
    getSiteDataSource(),
    (async () => {
      try {
        const page = await getEditorialPage("contato");
        return {
          source: "cms" as const,
          page: {
            title: page.title,
            intro: page.intro ?? "",
            whatsappNote: page.whatsappNote ?? "",
          },
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Erro desconhecido";
        console.error(`[CMS] Falha ao carregar /wp-json/atelie/v1/page/contato: ${message}`);
        return {
          source: "homologation" as const,
          page: contactPageContent,
        };
      }
    })(),
  ]);

  return {
    status: "ok",
    pageSource: editorial.source,
    channelsSource,
    page: editorial.page,
    site,
  };
}
