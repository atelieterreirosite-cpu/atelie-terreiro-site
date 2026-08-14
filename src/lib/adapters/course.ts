import { getCourses } from "@/lib/cms/client";
import type { CourseContent } from "@/lib/cms/models";
import type { CourseModality, CourseStatus, CourseView } from "@/types/views";

import { dateSortKey, formatDisplayPeriod, todaySortKey } from "./dates";
import { mapImageAsset } from "./media";

/**
 * Adapter CMS (`CourseContent`) → view-model da UI.
 * Consome apenas `getCourses()`. Coleção independente — sem relações.
 */

type SourceStatus = "ok" | "error";

interface CourseSource {
  status: SourceStatus;
  items: CourseContent[];
  error?: string;
}

let coursesSourcePromise: Promise<CourseSource> | null = null;

interface MappedCourse extends CourseView {
  sortKey: string;
}

function mapImage(item: CourseContent) {
  return mapImageAsset(item.content.image, item.content.title);
}

function mapModality(value: CourseContent["details"]["modality"]): CourseModality | undefined {
  if (value === "presencial" || value === "online" || value === "hibrido") {
    return value;
  }
  return undefined;
}

function courseStatus(item: CourseContent, sortKey: string): CourseStatus {
  if (item.details.registrationOpen) return "inscricoes-abertas";

  const today = todaySortKey();
  const startKey = dateSortKey(item.details.startDate, item.date);
  const endKey = dateSortKey(item.details.endDate);

  if (item.details.endDate && endKey < today) return "encerrado";
  if (item.details.startDate && startKey > today) return "em-andamento";
  if (sortKey !== "0000-00-00" && sortKey <= today) {
    if (!item.details.endDate || endKey >= today) return "em-andamento";
  }

  return "encerrado";
}

function mapRegistration(item: CourseContent, status: CourseStatus): CourseView["registration"] {
  if (item.details.registrationOpen) {
    return {
      label: "Inscrições abertas",
      href: item.details.registrationLink ?? undefined,
    };
  }

  if (status !== "encerrado" && item.details.registrationLink) {
    return {
      label: "Inscrição",
      href: item.details.registrationLink,
    };
  }

  return undefined;
}

function mapCourseToMapped(item: CourseContent): MappedCourse {
  const sortKey = dateSortKey(item.details.startDate, item.details.endDate || item.date);
  const status = courseStatus(item, sortKey);

  return {
    slug: item.slug,
    title: item.content.title,
    period: formatDisplayPeriod(item.details.startDate, item.details.endDate),
    modality: mapModality(item.details.modality),
    status,
    workload: item.details.workload ?? undefined,
    audience: item.details.audience ?? undefined,
    location: item.details.location ?? undefined,
    excerpt: item.content.summary ?? "",
    descriptionText: item.content.descriptionText,
    featuredImage: mapImage(item),
    registration: mapRegistration(item, status),
    sortKey,
  };
}

function stripSortKey({ sortKey: _sortKey, ...view }: MappedCourse): CourseView {
  return view;
}

export function mapCourseToView(item: CourseContent): CourseView {
  return stripSortKey(mapCourseToMapped(item));
}

export function groupCourseViews(items: CourseContent[]): {
  open: CourseView[];
  ongoing: CourseView[];
  past: CourseView[];
} {
  const mapped = items.map(mapCourseToMapped);

  const take = (status: CourseStatus, direction: "asc" | "desc") =>
    mapped
      .filter((course) => course.status === status)
      .sort((a, b) =>
        direction === "asc"
          ? a.sortKey.localeCompare(b.sortKey)
          : b.sortKey.localeCompare(a.sortKey),
      )
      .map(stripSortKey);

  return {
    open: take("inscricoes-abertas", "asc"),
    ongoing: take("em-andamento", "asc"),
    past: take("encerrado", "desc"),
  };
}

function loadCourseSource(): Promise<CourseSource> {
  if (!coursesSourcePromise) {
    coursesSourcePromise = (async () => {
      try {
        return { status: "ok", items: await getCourses() };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Erro desconhecido";
        console.error(`[CMS] Falha ao carregar /wp-json/wp/v2/curso: ${message}`);
        return { status: "error", items: [], error: message };
      }
    })();
  }

  return coursesSourcePromise;
}

export async function loadGroupedCourses(): Promise<{
  status: SourceStatus;
  error?: string;
  open: CourseView[];
  ongoing: CourseView[];
  past: CourseView[];
}> {
  const source = await loadCourseSource();
  if (source.status === "error") {
    return {
      status: "error",
      error: source.error,
      open: [],
      ongoing: [],
      past: [],
    };
  }

  return { status: "ok", ...groupCourseViews(source.items) };
}

export async function getCourseBySlugForView(slug: string): Promise<CourseView | undefined> {
  const source = await loadCourseSource();
  return source.items.map(mapCourseToView).find((course) => course.slug === slug);
}

export async function getCourseSlugsForStaticParams(): Promise<string[]> {
  const source = await loadCourseSource();
  if (source.status === "error") return [];
  return source.items.map((course) => course.slug).filter(Boolean);
}
