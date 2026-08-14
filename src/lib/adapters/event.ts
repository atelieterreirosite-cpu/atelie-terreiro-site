import { getEvents } from "@/lib/cms/client";
import type { EventContent } from "@/lib/cms/models";
import type { EventModality, EventStatus, EventView } from "@/types/views";

import { dateSortKey, formatDisplayPeriod, todaySortKey } from "./dates";
import { mapImageAsset } from "./media";

/**
 * Adapter CMS (`EventContent`) → view-model da UI.
 * Consome apenas `getEvents()`. Coleção independente — sem relações.
 */

type SourceStatus = "ok" | "error";

interface EventSource {
  status: SourceStatus;
  items: EventContent[];
  error?: string;
}

let eventsSourcePromise: Promise<EventSource> | null = null;

interface MappedEvent extends EventView {
  sortKey: string;
}

function mapImage(item: EventContent) {
  return mapImageAsset(item.content.image, item.content.title);
}

function formatLocation(item: EventContent): string | undefined {
  const parts = [item.details.location, item.details.city].filter(Boolean);
  return parts.length ? parts.join(" · ") : undefined;
}

function eventModality(item: EventContent): EventModality {
  return item.details.online ? "online" : "presencial";
}

function eventStatus(item: EventContent, sortKey: string): EventStatus {
  const today = todaySortKey();
  const endKey = dateSortKey(item.details.endDate);
  const startKey = dateSortKey(item.details.startDate, item.date);

  if (item.details.endDate && endKey < today) return "encerrado";
  if (item.details.startDate && startKey > today) return "futuro";
  if (sortKey !== "0000-00-00" && sortKey <= today) {
    if (!item.details.endDate || endKey >= today) return "em-andamento";
  }
  if (startKey > today) return "futuro";
  return "encerrado";
}

function mapRegistration(item: EventContent, status: EventStatus): EventView["registration"] {
  if (status === "encerrado") return undefined;

  if (item.details.registrationOpen) {
    return {
      label: "Inscrições abertas",
      href: item.details.registrationLink ?? undefined,
    };
  }

  if (item.details.registrationLink) {
    return {
      label: "Inscrição",
      href: item.details.registrationLink,
    };
  }

  return undefined;
}

function mapEventToMapped(item: EventContent): MappedEvent {
  const sortKey = dateSortKey(item.details.startDate, item.details.endDate || item.date);
  const status = eventStatus(item, sortKey);

  return {
    slug: item.slug,
    title: item.content.title,
    date: formatDisplayPeriod(item.details.startDate, item.details.endDate),
    time: item.details.schedule ?? undefined,
    location: formatLocation(item),
    modality: eventModality(item),
    status,
    excerpt: item.content.summary ?? "",
    descriptionText: item.content.descriptionText,
    featuredImage: mapImage(item),
    participants: item.details.participants ?? undefined,
    registration: mapRegistration(item, status),
    sortKey,
  };
}

function stripSortKey({ sortKey: _sortKey, ...view }: MappedEvent): EventView {
  return view;
}

export function mapEventToView(item: EventContent): EventView {
  return stripSortKey(mapEventToMapped(item));
}

export function groupEventViews(items: EventContent[]): {
  upcoming: EventView[];
  ongoing: EventView[];
  past: EventView[];
} {
  const mapped = items.map(mapEventToMapped);

  const take = (status: EventStatus, direction: "asc" | "desc") =>
    mapped
      .filter((event) => event.status === status)
      .sort((a, b) =>
        direction === "asc"
          ? a.sortKey.localeCompare(b.sortKey)
          : b.sortKey.localeCompare(a.sortKey),
      )
      .map(stripSortKey);

  return {
    upcoming: take("futuro", "asc"),
    ongoing: take("em-andamento", "asc"),
    past: take("encerrado", "desc"),
  };
}

function loadEventSource(): Promise<EventSource> {
  if (!eventsSourcePromise) {
    eventsSourcePromise = (async () => {
      try {
        return { status: "ok", items: await getEvents() };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Erro desconhecido";
        console.error(`[CMS] Falha ao carregar /wp-json/wp/v2/evento: ${message}`);
        return { status: "error", items: [], error: message };
      }
    })();
  }

  return eventsSourcePromise;
}

export async function loadGroupedEvents(): Promise<{
  status: SourceStatus;
  error?: string;
  upcoming: EventView[];
  ongoing: EventView[];
  past: EventView[];
}> {
  const source = await loadEventSource();
  if (source.status === "error") {
    return {
      status: "error",
      error: source.error,
      upcoming: [],
      ongoing: [],
      past: [],
    };
  }

  return { status: "ok", ...groupEventViews(source.items) };
}

export async function getEventBySlugForView(slug: string): Promise<EventView | undefined> {
  const source = await loadEventSource();
  return source.items.map(mapEventToView).find((event) => event.slug === slug);
}

export async function getEventSlugsForStaticParams(): Promise<string[]> {
  const source = await loadEventSource();
  if (source.status === "error") return [];
  return source.items.map((event) => event.slug).filter(Boolean);
}
