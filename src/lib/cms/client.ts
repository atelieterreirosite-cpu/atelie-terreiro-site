import { getWordPressUrl } from "./config";
import {
  fileFromWordPressMedia,
  imageFromWordPressMedia,
  mapCourse,
  mapEvent,
  mapExhibition,
  mapProject,
  mapPublication,
  mapVideo,
  mapWork,
  normalizeFile,
  normalizeImage,
  type ResolvedPostMedia,
} from "./mappers";
import type {
  ACFFile,
  ACFImage,
  AllContentResult,
  CMSCollection,
  CourseACF,
  CourseContent,
  EventACF,
  EventContent,
  ExhibitionACF,
  ExhibitionContent,
  ProjectACF,
  ProjectContent,
  PublicationACF,
  PublicationContent,
  VideoACF,
  VideoContent,
  WordPressMedia,
  WordPressPost,
  WorkACF,
  WorkContent,
} from "./models";

const ENDPOINTS = {
  projects: "projeto",
  events: "evento",
  courses: "curso",
  works: "obra",
  publications: "publicacao",
  exhibitions: "exposicao",
  videos: "video",
} as const;

const mediaCache = new Map<number, Promise<WordPressMedia>>();

function endpointUrl(path: string): string {
  return `${getWordPressUrl()}/wp-json/wp/v2/${path}`;
}

async function fetchJson<T>(path: string): Promise<T> {
  const url = endpointUrl(path);
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} — ${url}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(`Resposta não JSON (${contentType || "sem Content-Type"}) — ${url}`);
  }

  return (await response.json()) as T;
}

async function fetchCollection<TACF>(type: string): Promise<Array<WordPressPost<TACF>>> {
  return fetchJson<Array<WordPressPost<TACF>>>(
    `${type}?per_page=100&orderby=date&order=desc`,
  );
}

function fetchMedia(id: number): Promise<WordPressMedia> {
  const cached = mediaCache.get(id);
  if (cached) return cached;

  const request = fetchJson<WordPressMedia>(`media/${id}`);
  mediaCache.set(id, request);
  return request;
}

async function resolveImage(value: unknown): Promise<ACFImage | null> {
  const direct = normalizeImage(value);
  if (direct) return direct;
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) return null;

  try {
    return imageFromWordPressMedia(await fetchMedia(value));
  } catch (error) {
    console.error(`[CMS] Falha ao resolver imagem #${value}:`, error);
    return null;
  }
}

async function resolveFile(value: unknown): Promise<ACFFile | null> {
  const direct = normalizeFile(value);
  if (direct) return direct;
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) return null;

  try {
    return fileFromWordPressMedia(await fetchMedia(value));
  } catch (error) {
    console.error(`[CMS] Falha ao resolver arquivo #${value}:`, error);
    return null;
  }
}

async function resolveBaseMedia(acf: { imagem?: unknown; anexo?: unknown }): Promise<ResolvedPostMedia> {
  const [image, attachment] = await Promise.all([
    resolveImage(acf.imagem),
    resolveFile(acf.anexo),
  ]);

  return { image, attachment };
}

export async function getProjects(): Promise<ProjectContent[]> {
  const posts = await fetchCollection<ProjectACF>(ENDPOINTS.projects);
  return Promise.all(posts.map(async (post) => mapProject(post, await resolveBaseMedia(post.acf))));
}

export async function getEvents(): Promise<EventContent[]> {
  const posts = await fetchCollection<EventACF>(ENDPOINTS.events);
  return Promise.all(posts.map(async (post) => mapEvent(post, await resolveBaseMedia(post.acf))));
}

export async function getCourses(): Promise<CourseContent[]> {
  const posts = await fetchCollection<CourseACF>(ENDPOINTS.courses);
  return Promise.all(posts.map(async (post) => mapCourse(post, await resolveBaseMedia(post.acf))));
}

export async function getWorks(): Promise<WorkContent[]> {
  const posts = await fetchCollection<WorkACF>(ENDPOINTS.works);
  return Promise.all(posts.map(async (post) => mapWork(post, await resolveBaseMedia(post.acf))));
}

export async function getPublications(): Promise<PublicationContent[]> {
  const posts = await fetchCollection<PublicationACF>(ENDPOINTS.publications);
  return Promise.all(
    posts.map(async (post) => mapPublication(post, await resolveBaseMedia(post.acf))),
  );
}

export async function getExhibitions(): Promise<ExhibitionContent[]> {
  const posts = await fetchCollection<ExhibitionACF>(ENDPOINTS.exhibitions);
  return Promise.all(
    posts.map(async (post) => mapExhibition(post, await resolveBaseMedia(post.acf))),
  );
}

export async function getVideos(): Promise<VideoContent[]> {
  const posts = await fetchCollection<VideoACF>(ENDPOINTS.videos);
  return Promise.all(
    posts.map(async (post) => {
      const [media, videoFile] = await Promise.all([
        resolveBaseMedia(post.acf),
        resolveFile(post.acf.arquivo_video),
      ]);
      return mapVideo(post, media, videoFile);
    }),
  );
}

async function safeCollection<TItem>(
  endpoint: string,
  loader: () => Promise<TItem[]>,
): Promise<CMSCollection<TItem>> {
  try {
    return { endpoint, status: "ok", items: await loader() };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`[CMS] Falha ao carregar /wp-json/wp/v2/${endpoint}: ${message}`);
    return { endpoint, status: "error", items: [], error: message };
  }
}

export async function getAllContent(): Promise<AllContentResult> {
  const [projects, events, courses, works, publications, exhibitions, videos] =
    await Promise.all([
      safeCollection(ENDPOINTS.projects, getProjects),
      safeCollection(ENDPOINTS.events, getEvents),
      safeCollection(ENDPOINTS.courses, getCourses),
      safeCollection(ENDPOINTS.works, getWorks),
      safeCollection(ENDPOINTS.publications, getPublications),
      safeCollection(ENDPOINTS.exhibitions, getExhibitions),
      safeCollection(ENDPOINTS.videos, getVideos),
    ]);

  return { projects, events, courses, works, publications, exhibitions, videos };
}
