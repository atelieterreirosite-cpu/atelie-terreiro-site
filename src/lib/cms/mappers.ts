import type {
  ACFFile,
  ACFImage,
  CMSItem,
  ComplementarySectionContent,
  CourseACF,
  CourseContent,
  EditorialPageContent,
  EditorialPageLink,
  EventACF,
  EventContent,
  ExhibitionACF,
  ExhibitionContent,
  NormalizedBaseContent,
  OptionsContent,
  ProjectACF,
  ProjectContent,
  PublicationACF,
  PublicationContent,
  ResolvedEditorialMedia,
  TeamACF,
  TeamContent,
  TeamLink,
  VideoACF,
  VideoContent,
  VideoPlatform,
  WordPressEditorialPage,
  WordPressMedia,
  WordPressOptions,
  WordPressPost,
  WorkACF,
  WorkContent,
} from "./models";

type UnknownRecord = Record<string, unknown>;

export interface ResolvedPostMedia {
  image: ACFImage | null;
  attachment: ACFFile | null;
}

export interface ResolvedProjectMedia extends ResolvedPostMedia {
  videoFile: ACFFile | null;
  gallery: ACFImage[];
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

function decodeBasicEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

/**
 * Editorial fields are plain text in CMS v3. Leftover markup from previous
 * WYSIWYG fields is converted to text with line breaks — never rendered as HTML.
 */
export function normalizeEditorialText(value: unknown): string | null {
  if (typeof value !== "string") return normalizeText(value);

  const raw = value.replace(/\r\n/g, "\n").trim();
  if (!raw) return null;

  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(raw);
  if (!looksLikeHtml) {
    return raw.replace(/\n{3,}/g, "\n\n") || null;
  }

  const withBreaks = raw
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "");

  const stripped = decodeBasicEntities(withBreaks.replace(/<[^>]+>/g, ""));
  return stripped.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim() || null;
}

export function splitEditorialParagraphs(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((entry) => normalizeEditorialText(entry))
      .filter((entry): entry is string => Boolean(entry));
  }

  const text = normalizeEditorialText(value);
  if (!text) return [];
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function normalizeStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return splitEditorialParagraphs(value);

  const items: string[] = [];
  for (const entry of value) {
    if (typeof entry === "string" || typeof entry === "number") {
      const text = normalizeEditorialText(entry);
      if (text) items.push(text);
      continue;
    }

    if (isRecord(entry)) {
      const text = normalizeEditorialText(
        entry.item ?? entry.label ?? entry.title ?? entry.texto ?? entry.name,
      );
      if (text) items.push(text);
    }
  }

  return items;
}

function normalizeStartSeconds(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
    return Math.floor(value);
  }

  const text = normalizeText(value);
  if (!text) return null;

  const parsed = Number(text);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : null;
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
    summary: normalizeEditorialText(post.acf.resumo),
    descriptionText: normalizeEditorialText(post.acf.descricao),
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

export function mapProject(
  post: WordPressPost<ProjectACF>,
  media: ResolvedProjectMedia,
): ProjectContent {
  return item(post, media, {
    startYear: normalizeText(post.acf.ano_inicio),
    endYear: normalizeText(post.acf.ano_fim),
    ongoing: normalizeBoolean(post.acf.em_andamento),
    location: normalizeText(post.acf.local),
    participants: normalizeText(post.acf.participantes),
    curation: normalizeText(post.acf.curadoria_coordenacao),
    videoUrl: safeHttpUrl(post.acf.video_url),
    videoFile: media.videoFile,
    gallery: media.gallery,
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

export function mapWork(
  post: WordPressPost<WorkACF>,
  media: ResolvedPostMedia,
  videoFile: ACFFile | null,
): WorkContent {
  return item(post, media, {
    artist: normalizeText(post.acf.artista),
    year: normalizeText(post.acf.ano),
    technique: normalizeText(post.acf.tecnica),
    dimensions: normalizeText(post.acf.dimensoes),
    relatedProjectId: normalizeRelationId(post.acf.projeto_relacionado),
    videoUrl: safeHttpUrl(post.acf.video_url),
    videoFile,
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

/**
 * Áreas do CPT equipe: array real, JSON em string, ou lista simples.
 * JSON malformado → [] (não inventa itens).
 */
export function normalizeTeamAreas(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((entry) => normalizeText(entry))
      .filter((entry): entry is string => Boolean(entry));
  }

  if (value === false || value === null || value === undefined) return [];
  if (typeof value !== "string") return [];

  const text = value.trim();
  if (!text) return [];

  try {
    const parsed: unknown = JSON.parse(text);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((entry) => normalizeText(entry))
      .filter((entry): entry is string => Boolean(entry));
  } catch {
    if (text.startsWith("[")) return [];
    return text
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
}

function coerceTeamLinkEntries(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (value === false || value === null || value === undefined) return [];
  if (typeof value !== "string") return [];

  const text = value.trim();
  if (!text) return [];

  try {
    const parsed: unknown = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Near-JSON do ACF (chaves sem aspas): { label: "...", href: "..." }
    const nearJson = text.replace(/([{,]\s*)([A-Za-z_][\w]*)\s*:/g, '$1"$2":');
    try {
      const parsed: unknown = JSON.parse(nearJson);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}

/**
 * Links do CPT equipe: array, JSON ou near-JSON.
 * Mantém só entradas com label e href http(s) válidos.
 */
export function normalizeTeamLinks(value: unknown): TeamLink[] {
  const links: TeamLink[] = [];

  for (const entry of coerceTeamLinkEntries(value)) {
    if (!isRecord(entry)) continue;
    const label = normalizeText(entry.label);
    const href = safeHttpUrl(entry.href ?? entry.url);
    if (label && href) links.push({ label, href });
  }

  return links;
}

function normalizeTeamOrder(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }

  return Number.POSITIVE_INFINITY;
}

export function mapTeamMember(
  post: WordPressPost<TeamACF>,
  image: ACFImage | null,
): TeamContent {
  return {
    id: post.id,
    date: post.date,
    modified: post.modified,
    slug: post.slug,
    status: post.status,
    link: post.link,
    title:
      normalizeText(post.acf.titulo) ??
      normalizeText(post.title?.rendered) ??
      `Integrante #${post.id}`,
    role: normalizeText(post.acf.atuacao),
    bio: normalizeEditorialText(post.acf.bio),
    bioFull: normalizeEditorialText(post.acf.bio_completa),
    image,
    areas: normalizeTeamAreas(post.acf.areas),
    links: normalizeTeamLinks(post.acf.links),
    order: normalizeTeamOrder(post.acf.ordem),
    active: normalizeBoolean(post.acf.ativo),
  };
}

function mapSocialLinks(value: unknown): Array<{ label: string; url: string }> {
  if (!Array.isArray(value)) return [];

  const links: Array<{ label: string; url: string }> = [];
  for (const entry of value) {
    if (!isRecord(entry)) continue;
    const label = normalizeText(entry.label);
    const url = safeHttpUrl(entry.url);
    if (label && url) links.push({ label, url });
  }

  return links;
}

function mapPageLinks(value: unknown): EditorialPageLink[] {
  if (!Array.isArray(value)) return [];

  const links: EditorialPageLink[] = [];
  for (const entry of value) {
    if (!isRecord(entry)) continue;
    const label = normalizeText(entry.label ?? entry.title);
    const rawUrl = normalizeText(entry.url ?? entry.href);
    if (!label || !rawUrl) continue;

    const url =
      rawUrl.startsWith("/") && !rawUrl.endsWith("/") ? `${rawUrl}/` : rawUrl;
    links.push({ label, url });
  }

  return links;
}

function parseComplementaryJson(raw: string): unknown {
  const text = decodeBasicEntities(raw.replace(/\r\n/g, "\n")).trim();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    try {
      return JSON.parse(text.replace(/}\s*{/g, "},{"));
    } catch {
      return null;
    }
  }
}

function mapComplementarySections(value: unknown): ComplementarySectionContent[] {
  let parsed: unknown = value;

  if (typeof value === "string") {
    parsed = parseComplementaryJson(value);
  }

  if (isRecord(parsed) && !Array.isArray(parsed)) {
    parsed = [parsed];
  }

  if (!Array.isArray(parsed)) return [];

  const sections: ComplementarySectionContent[] = [];
  for (const entry of parsed) {
    if (!isRecord(entry)) continue;
    const title = normalizeEditorialText(entry.title ?? entry.titulo) ?? "";
    const items = normalizeStringList(entry.items ?? entry.itens ?? entry.item);
    if (!title && items.length === 0) continue;
    sections.push({ title, items });
  }

  return sections;
}

export function mapOptions(
  payload: WordPressOptions,
  homeVideoFile: ACFFile | null,
): OptionsContent {
  const acf = payload.acf ?? {};

  return {
    siteName: normalizeText(acf.site_name),
    siteTagline: normalizeEditorialText(acf.site_tagline),
    addressStreet: normalizeText(acf.address_street),
    addressNeighborhood: normalizeText(acf.address_neighborhood),
    addressCity: normalizeText(acf.address_city),
    addressRegion: normalizeText(acf.address_region),
    email: normalizeText(acf.email),
    whatsappDisplay: normalizeText(acf.whatsapp_display),
    whatsappUrl: safeHttpUrl(acf.whatsapp_url),
    socialLinks: mapSocialLinks(acf.social_links),
    homeVideoUrl: safeHttpUrl(acf.home_video_url),
    homeVideoFile,
    homeVideoTitle: normalizeText(acf.home_video_title),
    homeVideoDescription: normalizeEditorialText(acf.home_video_description),
    homeVideoStart: normalizeStartSeconds(acf.home_video_start),
  };
}

export function mapEditorialPage(
  payload: WordPressEditorialPage,
  media: ResolvedEditorialMedia,
): EditorialPageContent {
  const acf = payload.acf ?? {};

  return {
    slug: payload.slug,
    title: normalizeText(payload.title) ?? payload.slug,
    intro: normalizeEditorialText(acf.intro),
    whatsappNote: normalizeEditorialText(acf.whatsapp_note),
    sliderImages: media.sliderImages,
    identityTitle: normalizeText(acf.identity_title),
    identityParagraphs: splitEditorialParagraphs(acf.identity_paragraphs),
    originTitle: normalizeText(acf.origin_title),
    originParagraphs: splitEditorialParagraphs(acf.origin_paragraphs),
    letterQuote: normalizeEditorialText(acf.letter_quote),
    letterAttribution: normalizeText(acf.letter_attribution),
    letterNote: normalizeEditorialText(acf.letter_note),
    practicesTitle: normalizeText(acf.practices_title),
    practicesIntro: normalizeEditorialText(acf.practices_intro),
    practicesItems: normalizeStringList(acf.practices_items),
    practicesNote: normalizeEditorialText(acf.practices_note),
    territoryTitle: normalizeText(acf.territory_title),
    territoryParagraphs: splitEditorialParagraphs(acf.territory_paragraphs),
    territoryImage: media.territoryImage,
    luandaTitle: normalizeText(acf.luanda_title),
    luandaParagraphs: splitEditorialParagraphs(acf.luanda_paragraphs),
    luandaImage: media.luandaImage,
    complementaryTitle: normalizeText(acf.complementary_title),
    complementarySections: mapComplementarySections(acf.complementary_sections),
    pageLinks: mapPageLinks(acf.page_links),
  };
}
