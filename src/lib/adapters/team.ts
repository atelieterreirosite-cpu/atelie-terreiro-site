import { getTeam } from "@/lib/cms/client";
import type { CMSCollection, TeamContent } from "@/lib/cms/models";
import type { TeamMemberView } from "@/types/views";

import { mapImageAsset } from "./media";

/**
 * Adapter CMS (`TeamContent` do CPT `equipe`) → view-model da UI.
 * Consome apenas `getTeam()`. Sem páginas individuais.
 */

let teamPromise: Promise<CMSCollection<TeamMemberView>> | null = null;

export function mapTeamMemberToView(item: TeamContent): TeamMemberView {
  return {
    slug: item.slug,
    name: item.title,
    role: item.role ?? undefined,
    bio: item.bio ?? "",
    bioFull: item.bioFull ?? undefined,
    image: mapImageAsset(item.image, item.title),
    areas: item.areas.length > 0 ? item.areas : undefined,
    links: item.links.length > 0 ? item.links : undefined,
  };
}

export function mapTeamMembersToViews(items: TeamContent[]): TeamMemberView[] {
  return [...items]
    .filter((item) => item.active)
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.id - b.id;
    })
    .map(mapTeamMemberToView);
}

async function fetchTeam(): Promise<CMSCollection<TeamMemberView>> {
  try {
    const items = await getTeam();
    return {
      endpoint: "equipe",
      status: "ok",
      items: mapTeamMembersToViews(items),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[CMS] Falha ao carregar /wp-json/wp/v2/equipe: ${message}`);
    return { endpoint: "equipe", status: "error", items: [], error: message };
  }
}

/**
 * Isola falha de `getTeam()` no espírito de `safeCollection`.
 * Memoizado no processo de build.
 */
export function loadTeam(): Promise<CMSCollection<TeamMemberView>> {
  if (!teamPromise) {
    teamPromise = fetchTeam();
  }
  return teamPromise;
}
