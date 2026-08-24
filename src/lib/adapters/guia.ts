import { getGuias } from "@/lib/cms/client";
import type { CMSCollection, GuiaContent } from "@/lib/cms/models";
import type { GuideView } from "@/types/views";

import { mapImageAsset } from "./media";

/**
 * Adapter CMS (`GuiaContent` do CPT `guia`) → view-model da seção
 * “Quem caminha conosco”. Consome apenas `getGuias()`. Sem páginas individuais.
 */

let guiasPromise: Promise<CMSCollection<GuideView>> | null = null;

export function mapGuiaToView(item: GuiaContent): GuideView {
  return {
    id: item.id,
    slug: item.slug,
    name: item.title,
    image: mapImageAsset(item.image, item.title),
  };
}

/**
 * Mantém a ordem retornada pelo WordPress (`orderby=date&order=desc`).
 * Filtra apenas `publish`. Sem reordenação artificial.
 */
export function mapGuiasToViews(items: GuiaContent[]): GuideView[] {
  return items.filter((item) => item.status === "publish").map(mapGuiaToView);
}

async function fetchGuias(): Promise<CMSCollection<GuideView>> {
  try {
    const items = await getGuias();
    return {
      endpoint: "guia",
      status: "ok",
      items: mapGuiasToViews(items),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[CMS] Falha ao carregar /wp-json/wp/v2/guia: ${message}`);
    return { endpoint: "guia", status: "error", items: [], error: message };
  }
}

/**
 * Isola falha de `getGuias()` no espírito de `safeCollection`.
 * Memoizado no processo de build.
 */
export function loadGuias(): Promise<CMSCollection<GuideView>> {
  if (!guiasPromise) {
    guiasPromise = fetchGuias();
  }
  return guiasPromise;
}
