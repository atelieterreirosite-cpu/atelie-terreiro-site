import type {
  ACFFile,
  ACFImage,
  CMSItem,
  CourseACF,
  CourseContent,
  EventACF,
  EventContent,
  ExhibitionACF,
  ExhibitionContent,
  NormalizedBaseContent,
  ProjectACF,
  ProjectContent,
  PublicationACF,
  PublicationContent,
  VideoACF,
  VideoContent,
  VideoPlatform,
  WordPressMedia,
  WordPressPost,
  WorkACF,
  WorkContent,
} from "./models";

type UnknownRecord = Record<string, unknown>;

export interface ResolvedPostMedia {
  image: ACFImage | null;
  attachment: ACFFile | null;
}

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function positiveNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
  }

  return undefined;
}

function recordOfPrimitives(value: unknown): Record<string, string | number> | undefined {
  if (!isRecord(value)) return undefined;

  const entries = Object.entries(value).filter(
    (entry): entry is [string, string | number] =>
      typeof entry[1] === "string" || typeof entry[1] === "number",
  );

  return entries.length ? Object.fromEntries(entries) : undefined;
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

export function normalizeText(value: unknown): string | null {
  if (typeof value === "string") {
    const normalized = value.trim();
    return normalized || null;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return null;
}

export function normalizeBoolean(value: unknown): boolean {
  return value === true || value === 1 || value === "1" || value === "true";
}

export function normalizeRelationId(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) return value;

  if (typeof value === "string" && /^\d+$/.test(value)) {
    const parsed = Number(value);
    return parsed > 0 ? parsed : null;
  }

  if (isRecord(value)) {
    return normalizeRelationId(value.ID ?? value.id);
  }

  return null;
}

export function normalizeImage(value: unknown): ACFImage | null {
  if (!isRecord(value)) return null;

  const url = safeHttpUrl(value.url ?? value.source_url);
  if (!url) return null;

  const id = positiveNumber(value.ID ?? value.id);
  const width = positiveNumber(value.width);
  const height = positiveNumber(value.height);

  return {
    ...(id !== undefined ? { ID: id, id } : {}),
    url,
    ...(normalizeText(value.alt ?? value.alt_text)
      ? { alt: normalizeText(value.alt ?? value.alt_text) ?? undefined }
      : {}),
    ...(normalizeText(value.title) ? { title: normalizeText(value.title) ?? undefined } : {}),
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
    ...(recordOfPrimitives(value.sizes) ? { sizes: recordOfPrimitives(value.sizes) } : {}),
  };
}

export function normalizeFile(value: unknown): ACFFile | null {
  if (!isRecord(value)) return null;

  const url = safeHttpUrl(value.url ?? value.source_url);
  if (!url) return null;

  const id = positiveNumber(value.ID ?? value.id);

  return {
    ...(id !== undefined ? { ID: id, id } : {}),
    url,
    ...(normalizeText(value.filename)
      ? { filename: normalizeText(value.filename) ?? undefined }
      : {}),
    ...(positiveNumber(value.filesize) !== undefined
      ? { filesize: positiveNumber(value.filesize) }
      : {}),
    ...(normalizeText(value.mime_type)
      ? { mime_type: normalizeText(value.mime_type) ?? undefined }
      : {}),
    ...(normalizeText(value.title) ? { title: normalizeText(value.title) ?? undefined } : {}),
  };
}

function filenameFromUrl(url: string): string | undefined {
  try {
    const segment = new URL(url).pathname.split("/").filter(Boolean).at(-1);
    return segment ? decodeURIComponent(segment) : undefined;
  } catch {
    return undefined;
  }
}

export function imageFromWordPressMedia(media: WordPressMedia): ACFImage | null {
  const url = safeHttpUrl(media.source_url);
  if (!url) return null;

  const sizes: Record<string, string | number> = {};
  for (const [name, size] of Object.entries(media.media_details?.sizes ?? {})) {
    if (size.source_url) sizes[name] = size.source_url;
    if (size.width !== undefined) sizes[`${name}-width`] = size.width;
    if (size.height !== undefined) sizes[`${name}-height`] = size.height;
  }

  return {
    ID: media.id,
    id: media.id,
    url,
    alt: normalizeText(media.alt_text) ?? undefined,
    title: normalizeText(media.title?.rendered) ?? undefined,
    width: positiveNumber(media.media_details?.width),
    height: positiveNumber(media.media_details?.height),
    sizes: Object.keys(sizes).length ? sizes : undefined,
  };
}

export function fileFromWordPressMedia(media: WordPressMedia): ACFFile | null {
  const url = safeHttpUrl(media.source_url);
  if (!url) return null;

  return {
    ID: media.id,
    id: media.id,
    url,
    filename: filenameFromUrl(url),
    filesize: positiveNumber(media.media_details?.filesize),
    mime_type: normalizeText(media.mime_type ?? media.media_details?.sizes?.full?.mime_type) ?? undefined,
    title: normalizeText(media.title?.rendered) ?? undefined,
  };
}

export function formatAcfDate(value: unknown): string | null {
  const text = normalizeText(value);
  if (!text) return null;

  const compact = /^(\d{4})(\d{2})(\d{2})$/.exec(text);
  if (compact) return `${compact[3]}/${compact[2]}/${compact[1]}`;

  return text;
}

function normalizePlatform(value: unknown): VideoPlatform | null {
  const platform = normalizeText(value)?.toLowerCase();
  return platform === "youtube" ||
    platform === "vimeo" ||
    platform === "instagram" ||
    platform === "wordpress" ||
    platform === "outro"
    ? platform
    : null;
}

function baseContent<TACF extends { titulo?: unknown; resumo?: unknown; descricao?: unknown; link_externo?: unknown }>(
  post: WordPressPost<TACF>,
  media: ResolvedPostMedia,
): NormalizedBaseContent {
  return {
    title:
      normalizeText(post.acf.titulo) ??
      normalizeText(post.title?.rendered) ??
      `Conteúdo #${post.id}`,
    summary: normalizeText(post.acf.resumo),
    descriptionHtml: normalizeText(post.acf.descricao),
    image: media.image,
    attachment: media.attachment,
    externalLink: safeHttpUrl(post.acf.link_externo),
  };
}

function item<TACF extends { titulo?: unknown; resumo?: unknown; descricao?: unknown; link_externo?: unknown }, TDetails extends object>(
  post: WordPressPost<TACF>,
  media: ResolvedPostMedia,
  details: TDetails,
): CMSItem<TDetails> {
  return {
    id: post.id,
    date: post.date,
    modified: post.modified,
    slug: post.slug,
    status: post.status,
    link: post.link,
    content: baseContent(post, media),
    details,
  };
}

export function mapProject(post: WordPressPost<ProjectACF>, media: ResolvedPostMedia): ProjectContent {
  return item(post, media, {
    startYear: normalizeText(post.acf.ano_inicio),
    endYear: normalizeText(post.acf.ano_fim),
    ongoing: normalizeBoolean(post.acf.em_andamento),
    location: normalizeText(post.acf.local),
    participants: normalizeText(post.acf.participantes),
    curation: normalizeText(post.acf.curadoria_coordenacao),
    videoUrl: safeHttpUrl(post.acf.video_url),
  });
}

export function mapEvent(post: WordPressPost<EventACF>, media: ResolvedPostMedia): EventContent {
  return item(post, media, {
    startDate: formatAcfDate(post.acf.data_inicio),
    endDate: formatAcfDate(post.acf.data_fim),
    schedule: normalizeText(post.acf.horario),
    location: normalizeText(post.acf.local),
    city: normalizeText(post.acf.cidade),
    online: normalizeBoolean(post.acf.evento_online),
    eventLink: safeHttpUrl(post.acf.link_evento),
    relatedProjectId: normalizeRelationId(post.acf.projeto_relacionado),
    participants: normalizeText(post.acf.participantes),
    registrationOpen: normalizeBoolean(post.acf.inscricoes_abertas),
    registrationLink: safeHttpUrl(post.acf.link_inscricao),
  });
}

export function mapCourse(post: WordPressPost<CourseACF>, media: ResolvedPostMedia): CourseContent {
  return item(post, media, {
    workload: normalizeText(post.acf.carga_horaria),
    modality: post.acf.modalidade || null,
    startDate: formatAcfDate(post.acf.data_inicio),
    endDate: formatAcfDate(post.acf.data_fim),
    schedule: normalizeText(post.acf.horario),
    location: normalizeText(post.acf.local),
    instructors: normalizeText(post.acf.ministrantes),
    audience: normalizeText(post.acf.publico_alvo),
    registrationOpen: normalizeBoolean(post.acf.inscricoes_abertas),
    registrationLink: safeHttpUrl(post.acf.link_inscricao),
    price: normalizeText(post.acf.valor),
  });
}

export function mapWork(post: WordPressPost<WorkACF>, media: ResolvedPostMedia): WorkContent {
  return item(post, media, {
    artist: normalizeText(post.acf.artista),
    year: normalizeText(post.acf.ano),
    technique: normalizeText(post.acf.tecnica),
    dimensions: normalizeText(post.acf.dimensoes),
    relatedProjectId: normalizeRelationId(post.acf.projeto_relacionado),
    videoUrl: safeHttpUrl(post.acf.video_url),
    credits: normalizeText(post.acf.creditos),
  });
}

export function mapPublication(
  post: WordPressPost<PublicationACF>,
  media: ResolvedPostMedia,
): PublicationContent {
  return item(post, media, {
    publicationType: normalizeText(post.acf.tipo_publicacao),
    authors: normalizeText(post.acf.autores),
    year: normalizeText(post.acf.ano),
    relatedProjectId: normalizeRelationId(post.acf.projeto_relacionado),
    credits: normalizeText(post.acf.creditos),
  });
}

export function mapExhibition(
  post: WordPressPost<ExhibitionACF>,
  media: ResolvedPostMedia,
): ExhibitionContent {
  return item(post, media, {
    startDate: formatAcfDate(post.acf.data_inicio),
    endDate: formatAcfDate(post.acf.data_fim),
    onDisplay: normalizeBoolean(post.acf.em_cartaz),
    location: normalizeText(post.acf.local),
    city: normalizeText(post.acf.cidade),
    curation: normalizeText(post.acf.curadoria),
    artists: normalizeText(post.acf.artistas),
    relatedProjectId: normalizeRelationId(post.acf.projeto_relacionado),
  });
}

export function mapVideo(
  post: WordPressPost<VideoACF>,
  media: ResolvedPostMedia,
  videoFile: ACFFile | null,
): VideoContent {
  return item(post, media, {
    videoUrl: safeHttpUrl(post.acf.video_url),
    videoFile,
    platform: normalizePlatform(post.acf.plataforma),
    publicationDate: formatAcfDate(post.acf.data_publicacao),
    duration: normalizeText(post.acf.duracao),
    participants: normalizeText(post.acf.participantes),
    relatedProjectId: normalizeRelationId(post.acf.projeto_relacionado),
    relatedEventId: normalizeRelationId(post.acf.evento_relacionado),
    credits: normalizeText(post.acf.creditos),
  });
}
