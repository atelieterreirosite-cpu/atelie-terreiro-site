import { siteInfo } from "@/data/site";
import { getOptions } from "@/lib/cms/client";
import type { OptionsContent } from "@/lib/cms/models";
import type { SiteInfo } from "@/types/site";
import type { HomeVideo } from "@/types/views";

import { mapHomeVideo } from "./video";

/**
 * Adapter Options (`/atelie/v1/options`) → dados globais do site e vídeo da Home.
 * Componentes não fazem fetch. Fallback só quando o endpoint falha.
 */

export type SiteDataSource = "options" | "temporary-site";

interface OptionsSource {
  status: "ok" | "error";
  source: SiteDataSource;
  options: OptionsContent | null;
  error?: string;
}

let optionsSourcePromise: Promise<OptionsSource> | null = null;

function mapOptionsToSiteInfo(options: OptionsContent): SiteInfo {
  return {
    name: options.siteName ?? "",
    tagline: options.siteTagline ?? "",
    address: {
      street: options.addressStreet ?? "",
      neighborhood: options.addressNeighborhood ?? "",
      city: options.addressCity ?? "",
      region: options.addressRegion ?? "",
    },
    social: options.socialLinks.map((link) => ({
      label: link.label,
      href: link.url,
    })),
    contact: {
      email: options.email ?? "",
      whatsapp: {
        display: options.whatsappDisplay ?? "",
        href: options.whatsappUrl ?? "",
      },
    },
  };
}

async function fetchOptionsSource(): Promise<OptionsSource> {
  try {
    return {
      status: "ok",
      source: "options",
      options: await getOptions(),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[CMS] Falha ao carregar /wp-json/atelie/v1/options: ${message}`);
    return { status: "error", source: "temporary-site", options: null, error: message };
  }
}

export function loadOptionsSource(): Promise<OptionsSource> {
  if (!optionsSourcePromise) {
    optionsSourcePromise = fetchOptionsSource();
  }
  return optionsSourcePromise;
}

export async function loadSiteInfoForView(): Promise<SiteInfo> {
  const source = await loadOptionsSource();
  if (source.status === "error" || !source.options) {
    return siteInfo;
  }
  return mapOptionsToSiteInfo(source.options);
}

export async function getSiteDataSource(): Promise<SiteDataSource> {
  const source = await loadOptionsSource();
  return source.source;
}

export async function loadHomeVideoForView(): Promise<HomeVideo | undefined> {
  const source = await loadOptionsSource();
  if (source.status === "error" || !source.options) {
    return undefined;
  }

  const options = source.options;
  return mapHomeVideo(
    options.homeVideoFile,
    options.homeVideoUrl,
    options.homeVideoTitle,
    options.homeVideoDescription,
    options.homeVideoStart,
  );
}
