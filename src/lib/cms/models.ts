/**
 * Public CMS contract.
 *
 * ACF fields may be empty (`false`, `null` or `undefined`) and media fields may
 * be returned either as a full object or as a WordPress attachment ID. The
 * client resolves those variants before content reaches the UI.
 */

export type EmptyACFValue = false | null | undefined;
export type ACFValue<T> = T | EmptyACFValue;
export type ACFMediaValue<T> = T | number | EmptyACFValue;

export interface ACFImage {
  ID?: number;
  id?: number;
  url: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
  sizes?: Record<string, string | number>;
}

export interface ACFFile {
  ID?: number;
  id?: number;
  url: string;
  filename?: string;
  filesize?: number;
  mime_type?: string;
  title?: string;
}

export interface BaseACFContent {
  titulo?: ACFValue<string>;
  resumo?: ACFValue<string>;
  descricao?: ACFValue<string>;
  imagem?: ACFMediaValue<ACFImage>;
  anexo?: ACFMediaValue<ACFFile>;
  link_externo?: ACFValue<string>;
  /** Imagens adicionais (capa permanece em `imagem`) — Eventos/Cursos. */
  galeria_imagem_1?: ACFMediaValue<ACFImage>;
  galeria_imagem_2?: ACFMediaValue<ACFImage>;
  galeria_imagem_3?: ACFMediaValue<ACFImage>;
  galeria_imagem_4?: ACFMediaValue<ACFImage>;
  galeria_imagem_5?: ACFMediaValue<ACFImage>;
}

/**
 * Contrato ACF editorial unificado dos CPTs de Portfólio:
 * obra | projeto | exposicao | publicacao | video.
 *
 * Campos legados (resumo, anexo, ano, local, galeria_imagem_*, video_url, etc.)
 * não fazem mais parte deste modelo.
 */
export interface PortfolioACF {
  titulo?: ACFValue<string>;
  descricao?: ACFValue<string>;
  imagem?: ACFMediaValue<ACFImage>;
  ficha_tecnica_capa?: ACFValue<string>;
  imagem_1?: ACFMediaValue<ACFImage>;
  ficha_tecnica_imagem_1?: ACFValue<string>;
  imagem_2?: ACFMediaValue<ACFImage>;
  ficha_tecnica_imagem_2?: ACFValue<string>;
  imagem_3?: ACFMediaValue<ACFImage>;
  ficha_tecnica_imagem_3?: ACFValue<string>;
  imagem_4?: ACFMediaValue<ACFImage>;
  ficha_tecnica_imagem_4?: ACFValue<string>;
  imagem_5?: ACFMediaValue<ACFImage>;
  ficha_tecnica_imagem_5?: ACFValue<string>;
  /** URL, arquivo ou ID de mídia. */
  video_1?: ACFMediaValue<ACFFile> | ACFValue<string>;
  ficha_tecnica_video_1?: ACFValue<string>;
  video_2?: ACFMediaValue<ACFFile> | ACFValue<string>;
  ficha_tecnica_video_2?: ACFValue<string>;
  video_3?: ACFMediaValue<ACFFile> | ACFValue<string>;
  ficha_tecnica_video_3?: ACFValue<string>;
  video_4?: ACFMediaValue<ACFFile> | ACFValue<string>;
  ficha_tecnica_video_4?: ACFValue<string>;
  video_5?: ACFMediaValue<ACFFile> | ACFValue<string>;
  ficha_tecnica_video_5?: ACFValue<string>;
}

export type ProjectACF = PortfolioACF;
export type WorkACF = PortfolioACF;
export type PublicationACF = PortfolioACF;
export type ExhibitionACF = PortfolioACF;
export type VideoACF = PortfolioACF;

export interface EventACF extends BaseACFContent {
  data_inicio?: ACFValue<string>;
  data_fim?: ACFValue<string>;
  horario?: ACFValue<string>;
  local?: ACFValue<string>;
  cidade?: ACFValue<string>;
  evento_online?: ACFValue<boolean>;
  link_evento?: ACFValue<string>;
  projeto_relacionado?: ACFValue<number | string | { ID?: number; id?: number }>;
  participantes?: ACFValue<string>;
  inscricoes_abertas?: ACFValue<boolean>;
  link_inscricao?: ACFValue<string>;
}

export type CourseModality = "presencial" | "online" | "hibrido";

export interface CourseACF extends BaseACFContent {
  carga_horaria?: ACFValue<string>;
  modalidade?: ACFValue<CourseModality>;
  data_inicio?: ACFValue<string>;
  data_fim?: ACFValue<string>;
  horario?: ACFValue<string>;
  local?: ACFValue<string>;
  ministrantes?: ACFValue<string>;
  publico_alvo?: ACFValue<string>;
  inscricoes_abertas?: ACFValue<boolean>;
  link_inscricao?: ACFValue<string>;
  valor?: ACFValue<string>;
}

export type VideoPlatform =
  | "youtube"
  | "vimeo"
  | "instagram"
  | "wordpress"
  | "outro";

export interface TeamLinkACF {
  label?: ACFValue<string>;
  href?: ACFValue<string>;
  url?: ACFValue<string>;
}

export interface TeamACF {
  titulo?: ACFValue<string>;
  atuacao?: ACFValue<string>;
  bio?: ACFValue<string>;
  bio_completa?: ACFValue<string>;
  imagem?: ACFMediaValue<ACFImage> | "";
  areas?: ACFValue<string | string[]>;
  links?: ACFValue<string | TeamLinkACF[]>;
  ordem?: ACFValue<string | number>;
  ativo?: ACFValue<boolean>;
}

/** ACF do CPT `guia` — fonte da seção “Quem caminha conosco”. */
export interface GuiaACF {
  titulo?: ACFValue<string>;
  imagem?: ACFMediaValue<ACFImage> | "";
  descricao?: ACFValue<string>;
}

export interface WordPressPost<TACF> {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  link: string;
  acf: TACF;
  title?: {
    rendered: string;
  };
  atelie_gallery?: ACFValue<Array<ACFMediaValue<ACFImage>>>;
}

export interface WordPressMedia {
  id: number;
  source_url: string;
  mime_type?: string;
  media_type?: string;
  alt_text?: string;
  title?: { rendered?: string };
  media_details?: {
    width?: number;
    height?: number;
    filesize?: number;
    sizes?: Record<
      string,
      {
        source_url?: string;
        width?: number;
        height?: number;
        mime_type?: string;
      }
    >;
  };
}

export interface NormalizedBaseContent {
  title: string;
  summary: string | null;
  descriptionText: string | null;
  image: ACFImage | null;
  attachment: ACFFile | null;
  externalLink: string | null;
}

export interface CMSItem<TDetails extends object> {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  link: string;
  content: NormalizedBaseContent;
  details: TDetails;
}

export interface ProjectDetails {
  coverCaption: string | null;
  images: PortfolioCaptionedImageContent[];
  videos: PortfolioCaptionedVideoContent[];
}

export interface PortfolioCaptionedImageContent {
  image: ACFImage;
  caption: string | null;
}

export interface PortfolioCaptionedVideoContent {
  videoUrl: string | null;
  videoFile: ACFFile | null;
  caption: string | null;
}

export type PortfolioType = "obra" | "projeto" | "exposicao" | "publicacao" | "video";

/** Conteúdo normalizado unificado dos cinco CPTs de Portfólio. */
export interface PortfolioContent {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  link: string;
  type: PortfolioType;
  title: string;
  descriptionText: string | null;
  coverImage: ACFImage | null;
  coverCaption: string | null;
  images: PortfolioCaptionedImageContent[];
  videos: PortfolioCaptionedVideoContent[];
}

export type WorkDetails = ProjectDetails;
export type PublicationDetails = ProjectDetails;
export type ExhibitionDetails = ProjectDetails;
export type VideoDetails = ProjectDetails;

export interface EventDetails {
  startDate: string | null;
  endDate: string | null;
  schedule: string | null;
  location: string | null;
  city: string | null;
  online: boolean;
  eventLink: string | null;
  relatedProjectId: number | null;
  participants: string | null;
  registrationOpen: boolean;
  registrationLink: string | null;
  gallery: ACFImage[];
}

export interface CourseDetails {
  workload: string | null;
  modality: CourseModality | null;
  startDate: string | null;
  endDate: string | null;
  schedule: string | null;
  location: string | null;
  instructors: string | null;
  audience: string | null;
  registrationOpen: boolean;
  registrationLink: string | null;
  price: string | null;
  gallery: ACFImage[];
}

export type ProjectContent = PortfolioContent;
export type WorkContent = PortfolioContent;
export type PublicationContent = PortfolioContent;
export type ExhibitionContent = PortfolioContent;
export type VideoContent = PortfolioContent;
export type EventContent = CMSItem<EventDetails>;
export type CourseContent = CMSItem<CourseDetails>;

export interface TeamLink {
  label: string;
  href: string;
}

/** Conteúdo normalizado do CPT `equipe` (estrutura própria, sem BaseACF). */
export interface TeamContent {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  link: string;
  title: string;
  role: string | null;
  bio: string | null;
  bioFull: string | null;
  image: ACFImage | null;
  areas: string[];
  links: TeamLink[];
  order: number;
  active: boolean;
}

/** Conteúdo normalizado do CPT `guia` (estrutura própria, sem BaseACF). */
export interface GuiaContent {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  link: string;
  title: string;
  description: string | null;
  image: ACFImage | null;
}

export type CollectionStatus = "ok" | "error";

export interface CMSCollection<TItem> {
  endpoint: string;
  status: CollectionStatus;
  items: TItem[];
  error?: string;
}

export interface AllContentResult {
  projects: CMSCollection<ProjectContent>;
  events: CMSCollection<EventContent>;
  courses: CMSCollection<CourseContent>;
  works: CMSCollection<WorkContent>;
  publications: CMSCollection<PublicationContent>;
  exhibitions: CMSCollection<ExhibitionContent>;
  videos: CMSCollection<VideoContent>;
}

export interface OptionsSocialLink {
  label?: ACFValue<string>;
  url?: ACFValue<string>;
}

export interface OptionsACF {
  site_name?: ACFValue<string>;
  site_tagline?: ACFValue<string>;
  address_street?: ACFValue<string>;
  address_neighborhood?: ACFValue<string>;
  address_city?: ACFValue<string>;
  address_region?: ACFValue<string>;
  email?: ACFValue<string>;
  whatsapp_display?: ACFValue<string>;
  whatsapp_url?: ACFValue<string>;
  social_links?: ACFValue<OptionsSocialLink[]>;
  home_video_url?: ACFValue<string>;
  home_video_file?: ACFMediaValue<ACFFile>;
  home_video_title?: ACFValue<string>;
  home_video_description?: ACFValue<string>;
  home_video_start?: ACFValue<string | number>;
}

export interface WordPressOptions {
  id: number;
  slug: string;
  acf: OptionsACF;
}

export interface OptionsContent {
  siteName: string | null;
  siteTagline: string | null;
  addressStreet: string | null;
  addressNeighborhood: string | null;
  addressCity: string | null;
  addressRegion: string | null;
  email: string | null;
  whatsappDisplay: string | null;
  whatsappUrl: string | null;
  socialLinks: Array<{ label: string; url: string }>;
  homeVideoUrl: string | null;
  homeVideoFile: ACFFile | null;
  homeVideoTitle: string | null;
  homeVideoDescription: string | null;
  homeVideoStart: number | null;
}

export type EditorialPageSlug = "sobre" | "contato" | "arquivo" | "eventos" | "cursos";

export interface EditorialPageLinkACF {
  label?: ACFValue<string>;
  title?: ACFValue<string>;
  url?: ACFValue<string>;
  href?: ACFValue<string>;
}

export interface ComplementarySectionACF {
  title?: ACFValue<string>;
  titulo?: ACFValue<string>;
  description?: ACFValue<string>;
  descricao?: ACFValue<string>;
}

export interface EditorialPageACF {
  intro?: ACFValue<string>;
  whatsapp_note?: ACFValue<string>;
  slider_imagens?: ACFValue<Array<ACFMediaValue<ACFImage>>>;
  identity_title?: ACFValue<string>;
  identity_paragraphs?: ACFValue<string | string[]>;
  origin_title?: ACFValue<string>;
  origin_paragraphs?: ACFValue<string | string[]>;
  letter_quote?: ACFValue<string>;
  letter_attribution?: ACFValue<string>;
  letter_note?: ACFValue<string>;
  practices_title?: ACFValue<string>;
  practices_intro?: ACFValue<string>;
  practices_items?: ACFValue<unknown>;
  practices_note?: ACFValue<string>;
  territory_title?: ACFValue<string>;
  territory_paragraphs?: ACFValue<string | string[]>;
  territory_image?: ACFMediaValue<ACFImage>;
  territory_paragraphs_2?: ACFValue<string | string[]>;
  territory_image_2?: ACFMediaValue<ACFImage>;
  territory_paragraphs_3?: ACFValue<string | string[]>;
  territory_image_3?: ACFMediaValue<ACFImage>;
  luanda_title?: ACFValue<string>;
  luanda_paragraphs?: ACFValue<string | string[]>;
  luanda_image?: ACFMediaValue<ACFImage>;
  complementary_title?: ACFValue<string>;
  complementary_sections?: ACFValue<string | ComplementarySectionACF[]>;
  page_links?: ACFValue<EditorialPageLinkACF[]>;
}

export interface WordPressEditorialPage {
  id: number;
  slug: string;
  title?: string;
  content?: string;
  acf: EditorialPageACF;
}

export interface ComplementarySectionContent {
  title: string;
  description: string;
}

/** Prática normalizada a partir de `practices_items` (pares título + descrição). */
export interface PracticeItemContent {
  title: string;
  description: string;
}

export interface EditorialPageLink {
  label: string;
  url: string;
}

export interface EditorialPageContent {
  slug: string;
  title: string;
  intro: string | null;
  whatsappNote: string | null;
  sliderImages: ACFImage[];
  identityTitle: string | null;
  identityParagraphs: string[];
  originTitle: string | null;
  originParagraphs: string[];
  letterQuote: string | null;
  letterAttribution: string | null;
  letterNote: string | null;
  practicesTitle: string | null;
  practicesIntro: string | null;
  practicesItems: PracticeItemContent[];
  practicesNote: string | null;
  territoryTitle: string | null;
  territoryParagraphs: string[];
  territoryImage: ACFImage | null;
  territoryParagraphs2: string[];
  territoryImage2: ACFImage | null;
  territoryParagraphs3: string[];
  territoryImage3: ACFImage | null;
  /** Presente no CMS da Sobre; UI da Luanda pertence a `/equipe/`. */
  luandaTitle: string | null;
  luandaParagraphs: string[];
  luandaImage: ACFImage | null;
  complementaryTitle: string | null;
  complementarySections: ComplementarySectionContent[];
  pageLinks: EditorialPageLink[];
}

export interface ResolvedEditorialMedia {
  sliderImages: ACFImage[];
  territoryImage: ACFImage | null;
  territoryImage2: ACFImage | null;
  territoryImage3: ACFImage | null;
  luandaImage: ACFImage | null;
}
