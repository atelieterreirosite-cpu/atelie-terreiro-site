import { getWordPressUrl } from "./config";
import {
  fileFromWordPressMedia,
  imageFromWordPressMedia,
  mapCourse,
  mapEditorialPage,
  mapEvent,
  mapExhibition,
  mapOptions,
  mapProject,
  mapPublication,
  mapGuia,
  mapTeamMember,
  mapVideo,
  mapWork,
  normalizeFile,
  normalizeImage,
  normalizeEditorialText,
  normalizeText,
  type ResolvedPortfolioMedia,
  type ResolvedPostMedia,
} from "./mappers";
import type {
  ACFFile,
  ACFImage,
  AllContentResult,
  CMSCollection,
  CourseACF,
  CourseContent,
  EditorialPageContent,
  EditorialPageSlug,
  EventACF,
  EventContent,
  ExhibitionACF,
  ExhibitionContent,
  GuiaACF,
  GuiaContent,
  OptionsContent,
  PortfolioACF,
  PortfolioCaptionedImageContent,
  PortfolioCaptionedVideoContent,
  ProjectACF,
  ProjectContent,
  PublicationACF,
  PublicationContent,
  TeamACF,
  TeamContent,
  VideoACF,
  VideoContent,
  WordPressEditorialPage,
  WordPressMedia,
  WordPressOptions,
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
  team: "equipe",
  guia: "guia",
} as const;

const mediaCache = new Map<number, Promise<WordPressMedia>>();

function wpJsonUrl(path: string): string {
  return `${getWordPressUrl()}/wp-json/${path}`;
}

async function fetchWpJson<T>(path: string): Promise<T> {
  const url = wpJsonUrl(path);
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

async function fetchJson<T>(path: string): Promise<T> {
  return fetchWpJson<T>(`wp/v2/${path}`);
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

function safeHttpUrl(value: unknown): string | null {
  const text = normalizeText(value);
  if (!text) return null;

  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasMediaValue(value: unknown): boolean {
  if (value === false || value === null || value === undefined || value === "") return false;
  if (typeof value === "number") return Number.isInteger(value) && value > 0;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return false;
    if (/^\d+$/.test(trimmed) && Number(trimmed) > 0) return true;
    return Boolean(safeHttpUrl(trimmed));
  }
  if (typeof value === "object") return true;
  return false;
}

async function resolveImage(value: unknown): Promise<ACFImage | null> {
  const direct = normalizeImage(value);
  if (direct) return direct;

  let mediaId: number | null = null;
  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    mediaId = value;
  } else if (typeof value === "string" && /^\d+$/.test(value.trim())) {
    const parsed = Number(value.trim());
    mediaId = parsed > 0 ? parsed : null;
  }

  if (mediaId === null) return null;

  try {
    return imageFromWordPressMedia(await fetchMedia(mediaId));
  } catch (error) {
    console.error(`[CMS] Falha ao resolver imagem #${mediaId}:`, error);
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

async function resolveImageList(value: unknown): Promise<ACFImage[]> {
  if (!Array.isArray(value)) return [];

  const images = await Promise.all(value.map((entry) => resolveImage(entry)));
  return images.filter((image): image is ACFImage => image !== null);
}

function hasGalleryMedia(value: unknown): boolean {
  if (value === false || value === null || value === undefined || value === "") return false;
  if (typeof value === "number") return Number.isInteger(value) && value > 0;
  if (typeof value === "string") return /^\d+$/.test(value.trim()) && Number(value.trim()) > 0;
  if (typeof value === "object") return true;
  return false;
}

/**
 * Prioriza `galeria_imagem_1…5` (Eventos/Cursos).
 * Fallback legado `atelie_gallery` quando presente.
 * A capa (`imagem`) nunca entra nesta lista.
 */
function collectGallerySources(post: {
  atelie_gallery?: unknown;
  acf: {
    atelie_gallery?: unknown;
    galeria_imagem_1?: unknown;
    galeria_imagem_2?: unknown;
    galeria_imagem_3?: unknown;
    galeria_imagem_4?: unknown;
    galeria_imagem_5?: unknown;
  };
}): unknown[] {
  const slots = [
    post.acf.galeria_imagem_1,
    post.acf.galeria_imagem_2,
    post.acf.galeria_imagem_3,
    post.acf.galeria_imagem_4,
    post.acf.galeria_imagem_5,
  ].filter(hasGalleryMedia);

  const legacyRaw = post.atelie_gallery ?? post.acf.atelie_gallery;
  const legacy = Array.isArray(legacyRaw) ? legacyRaw.filter(hasGalleryMedia) : [];

  if (slots.length > 0) {
    if (legacy.length === 0) return slots;

    return slots.map((slot) => {
      const slotId =
        typeof slot === "number" || typeof slot === "string"
          ? Number(slot)
          : typeof slot === "object" && slot !== null
            ? Number(
                (slot as { id?: unknown; ID?: unknown }).id ??
                  (slot as { id?: unknown; ID?: unknown }).ID,
              )
            : NaN;

      if (!Number.isFinite(slotId) || slotId <= 0) return slot;

      const match = legacy.find((entry) => {
        if (typeof entry === "number") return entry === slotId;
        if (typeof entry === "string") return Number(entry) === slotId;
        if (typeof entry === "object" && entry !== null) {
          const id = Number(
            (entry as { id?: unknown; ID?: unknown }).id ??
              (entry as { id?: unknown; ID?: unknown }).ID,
          );
          return id === slotId;
        }
        return false;
      });

      return match ?? slot;
    });
  }

  return legacy.slice(0, 5);
}

async function resolveContentMedia(post: {
  atelie_gallery?: unknown;
  acf: {
    imagem?: unknown;
    anexo?: unknown;
    atelie_gallery?: unknown;
    galeria_imagem_1?: unknown;
    galeria_imagem_2?: unknown;
    galeria_imagem_3?: unknown;
    galeria_imagem_4?: unknown;
    galeria_imagem_5?: unknown;
  };
}): Promise<ResolvedPostMedia> {
  const [image, attachment, gallery] = await Promise.all([
    resolveImage(post.acf.imagem),
    resolveFile(post.acf.anexo),
    resolveImageList(collectGallerySources(post)),
  ]);

  return { image, attachment, gallery };
}

/**
 * Resolve slot de vídeo ACF: URL http(s), arquivo, ou ID de mídia.
 */
async function resolveVideoSlot(
  value: unknown,
): Promise<{ videoUrl: string | null; videoFile: ACFFile | null }> {
  if (!hasMediaValue(value)) {
    return { videoUrl: null, videoFile: null };
  }

  if (typeof value === "string") {
    const asUrl = safeHttpUrl(value);
    if (asUrl) return { videoUrl: asUrl, videoFile: null };

    if (/^\d+$/.test(value.trim())) {
      const file = await resolveFile(Number(value.trim()));
      return { videoUrl: null, videoFile: file };
    }

    return { videoUrl: null, videoFile: null };
  }

  if (typeof value === "number") {
    const file = await resolveFile(value);
    return { videoUrl: null, videoFile: file };
  }

  if (isRecord(value)) {
    const file = normalizeFile(value);
    if (file) {
      const mime = file.mime_type?.toLowerCase() ?? "";
      if (mime.startsWith("video/") || /\.(mp4|webm|ogg|mov)(\?|$)/i.test(file.url)) {
        return { videoUrl: null, videoFile: file };
      }
      return { videoUrl: file.url, videoFile: null };
    }

    const url = safeHttpUrl(value.url ?? value.source_url);
    if (url) return { videoUrl: url, videoFile: null };

    const id = Number(value.ID ?? value.id);
    if (Number.isInteger(id) && id > 0) {
      const resolved = await resolveFile(id);
      return { videoUrl: null, videoFile: resolved };
    }
  }

  return { videoUrl: null, videoFile: null };
}

async function resolvePortfolioMedia(acf: PortfolioACF): Promise<ResolvedPortfolioMedia> {
  const coverCaption = normalizeEditorialText(acf.ficha_tecnica_capa);

  const imageSlots: Array<{ image: unknown; caption: unknown }> = [
    { image: acf.imagem_1, caption: acf.ficha_tecnica_imagem_1 },
    { image: acf.imagem_2, caption: acf.ficha_tecnica_imagem_2 },
    { image: acf.imagem_3, caption: acf.ficha_tecnica_imagem_3 },
    { image: acf.imagem_4, caption: acf.ficha_tecnica_imagem_4 },
    { image: acf.imagem_5, caption: acf.ficha_tecnica_imagem_5 },
  ];

  const videoSlots: Array<{ video: unknown; caption: unknown }> = [
    { video: acf.video_1, caption: acf.ficha_tecnica_video_1 },
    { video: acf.video_2, caption: acf.ficha_tecnica_video_2 },
    { video: acf.video_3, caption: acf.ficha_tecnica_video_3 },
    { video: acf.video_4, caption: acf.ficha_tecnica_video_4 },
    { video: acf.video_5, caption: acf.ficha_tecnica_video_5 },
  ];

  const [coverImage, resolvedImages, resolvedVideos] = await Promise.all([
    resolveImage(acf.imagem),
    Promise.all(
      imageSlots.map(async (slot): Promise<PortfolioCaptionedImageContent | null> => {
        if (!hasMediaValue(slot.image)) return null;
        const image = await resolveImage(slot.image);
        if (!image) return null;
        return {
          image,
          caption: normalizeEditorialText(slot.caption),
        };
      }),
    ),
    Promise.all(
      videoSlots.map(async (slot): Promise<PortfolioCaptionedVideoContent | null> => {
        if (!hasMediaValue(slot.video)) return null;
        const resolved = await resolveVideoSlot(slot.video);
        if (!resolved.videoUrl && !resolved.videoFile) return null;
        return {
          videoUrl: resolved.videoUrl,
          videoFile: resolved.videoFile,
          caption: normalizeEditorialText(slot.caption),
        };
      }),
    ),
  ]);

  return {
    coverImage,
    coverCaption,
    images: resolvedImages.filter(
      (entry): entry is PortfolioCaptionedImageContent => entry !== null,
    ),
    videos: resolvedVideos.filter(
      (entry): entry is PortfolioCaptionedVideoContent => entry !== null,
    ),
  };
}

export async function getProjects(): Promise<ProjectContent[]> {
  const posts = await fetchCollection<ProjectACF>(ENDPOINTS.projects);
  return Promise.all(
    posts.map(async (post) => mapProject(post, await resolvePortfolioMedia(post.acf ?? {}))),
  );
}

export async function getEvents(): Promise<EventContent[]> {
  const posts = await fetchCollection<EventACF>(ENDPOINTS.events);
  return Promise.all(posts.map(async (post) => mapEvent(post, await resolveContentMedia(post))));
}

export async function getCourses(): Promise<CourseContent[]> {
  const posts = await fetchCollection<CourseACF>(ENDPOINTS.courses);
  return Promise.all(posts.map(async (post) => mapCourse(post, await resolveContentMedia(post))));
}

export async function getWorks(): Promise<WorkContent[]> {
  const posts = await fetchCollection<WorkACF>(ENDPOINTS.works);
  return Promise.all(
    posts.map(async (post) => mapWork(post, await resolvePortfolioMedia(post.acf ?? {}))),
  );
}

export async function getPublications(): Promise<PublicationContent[]> {
  const posts = await fetchCollection<PublicationACF>(ENDPOINTS.publications);
  return Promise.all(
    posts.map(async (post) => mapPublication(post, await resolvePortfolioMedia(post.acf ?? {}))),
  );
}

export async function getExhibitions(): Promise<ExhibitionContent[]> {
  const posts = await fetchCollection<ExhibitionACF>(ENDPOINTS.exhibitions);
  return Promise.all(
    posts.map(async (post) => mapExhibition(post, await resolvePortfolioMedia(post.acf ?? {}))),
  );
}

export async function getVideos(): Promise<VideoContent[]> {
  const posts = await fetchCollection<VideoACF>(ENDPOINTS.videos);
  return Promise.all(
    posts.map(async (post) => mapVideo(post, await resolvePortfolioMedia(post.acf ?? {}))),
  );
}

export async function getTeam(): Promise<TeamContent[]> {
  const posts = await fetchCollection<TeamACF>(ENDPOINTS.team);
  return Promise.all(
    posts.map(async (post) => mapTeamMember(post, await resolveImage(post.acf.imagem))),
  );
}

/**
 * CPT `guia` — seção “Quem caminha conosco”.
 * Ordem: a mesma de `fetchCollection` (`orderby=date&order=desc`).
 * Sem campo `ordem` no CMS; não reordenar no client.
 */
export async function getGuias(): Promise<GuiaContent[]> {
  const posts = await fetchCollection<GuiaACF>(ENDPOINTS.guia);
  return Promise.all(
    posts.map(async (post) => mapGuia(post, await resolveImage(post.acf.imagem))),
  );
}

export async function getOptions(): Promise<OptionsContent> {
  const payload = await fetchWpJson<WordPressOptions>("atelie/v1/options");
  const homeVideoFile = await resolveFile(payload.acf?.home_video_file);
  return mapOptions(payload, homeVideoFile);
}

export async function getEditorialPage(slug: EditorialPageSlug): Promise<EditorialPageContent> {
  const payload = await fetchWpJson<WordPressEditorialPage>(`atelie/v1/page/${slug}`);
  const acf = payload.acf ?? {};
  const [sliderImages, territoryImage, territoryImage2, territoryImage3, luandaImage] =
    await Promise.all([
      resolveImageList(acf.slider_imagens),
      resolveImage(acf.territory_image),
      resolveImage(acf.territory_image_2),
      resolveImage(acf.territory_image_3),
      resolveImage(acf.luanda_image),
    ]);

  return mapEditorialPage(payload, {
    sliderImages,
    territoryImage,
    territoryImage2,
    territoryImage3,
    luandaImage,
  });
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
