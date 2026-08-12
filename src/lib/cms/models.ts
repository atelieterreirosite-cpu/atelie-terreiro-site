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
}

export interface ProjectACF extends BaseACFContent {
  ano_inicio?: ACFValue<string | number>;
  ano_fim?: ACFValue<string | number>;
  em_andamento?: ACFValue<boolean>;
  local?: ACFValue<string>;
  participantes?: ACFValue<string>;
  curadoria_coordenacao?: ACFValue<string>;
  video_url?: ACFValue<string>;
}

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

export interface WorkACF extends BaseACFContent {
  artista?: ACFValue<string>;
  ano?: ACFValue<string | number>;
  tecnica?: ACFValue<string>;
  dimensoes?: ACFValue<string>;
  projeto_relacionado?: ACFValue<number | string | { ID?: number; id?: number }>;
  video_url?: ACFValue<string>;
  creditos?: ACFValue<string>;
}

export interface PublicationACF extends BaseACFContent {
  tipo_publicacao?: ACFValue<string>;
  autores?: ACFValue<string>;
  ano?: ACFValue<string | number>;
  projeto_relacionado?: ACFValue<number | string | { ID?: number; id?: number }>;
  creditos?: ACFValue<string>;
}

export interface ExhibitionACF extends BaseACFContent {
  data_inicio?: ACFValue<string>;
  data_fim?: ACFValue<string>;
  em_cartaz?: ACFValue<boolean>;
  local?: ACFValue<string>;
  cidade?: ACFValue<string>;
  curadoria?: ACFValue<string>;
  artistas?: ACFValue<string>;
  projeto_relacionado?: ACFValue<number | string | { ID?: number; id?: number }>;
}

export type VideoPlatform =
  | "youtube"
  | "vimeo"
  | "instagram"
  | "wordpress"
  | "outro";

export interface VideoACF extends Omit<BaseACFContent, "anexo"> {
  video_url?: ACFValue<string>;
  arquivo_video?: ACFMediaValue<ACFFile>;
  plataforma?: ACFValue<VideoPlatform>;
  data_publicacao?: ACFValue<string>;
  duracao?: ACFValue<string>;
  participantes?: ACFValue<string>;
  projeto_relacionado?: ACFValue<number | string | { ID?: number; id?: number }>;
  evento_relacionado?: ACFValue<number | string | { ID?: number; id?: number }>;
  creditos?: ACFValue<string>;
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
  descriptionHtml: string | null;
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
  startYear: string | null;
  endYear: string | null;
  ongoing: boolean;
  location: string | null;
  participants: string | null;
  curation: string | null;
  videoUrl: string | null;
}

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
}

export interface WorkDetails {
  artist: string | null;
  year: string | null;
  technique: string | null;
  dimensions: string | null;
  relatedProjectId: number | null;
  videoUrl: string | null;
  credits: string | null;
}

export interface PublicationDetails {
  publicationType: string | null;
  authors: string | null;
  year: string | null;
  relatedProjectId: number | null;
  credits: string | null;
}

export interface ExhibitionDetails {
  startDate: string | null;
  endDate: string | null;
  onDisplay: boolean;
  location: string | null;
  city: string | null;
  curation: string | null;
  artists: string | null;
  relatedProjectId: number | null;
}

export interface VideoDetails {
  videoUrl: string | null;
  videoFile: ACFFile | null;
  platform: VideoPlatform | null;
  publicationDate: string | null;
  duration: string | null;
  participants: string | null;
  relatedProjectId: number | null;
  relatedEventId: number | null;
  credits: string | null;
}

export type ProjectContent = CMSItem<ProjectDetails>;
export type EventContent = CMSItem<EventDetails>;
export type CourseContent = CMSItem<CourseDetails>;
export type WorkContent = CMSItem<WorkDetails>;
export type PublicationContent = CMSItem<PublicationDetails>;
export type ExhibitionContent = CMSItem<ExhibitionDetails>;
export type VideoContent = CMSItem<VideoDetails>;

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
