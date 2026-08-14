/**
 * View-models de apresentação.
 * Não substituem `src/lib/cms/models.ts`. Adapters CMS → estas props virão depois.
 */

export interface ImageAsset {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

export interface RelatedLink {
  label: string;
  href: string;
}

export type VideoProvider = "youtube" | "vimeo" | "file";

export interface ContentVideo {
  provider: VideoProvider;
  videoId?: string;
  url?: string;
  title: string;
  description?: string;
}

/** View-model da Home. Não faz parte do contrato CMS (`src/lib/cms`). */
export interface HomeVideo {
  provider: VideoProvider;
  videoId?: string;
  url?: string;
  startSeconds?: number;
  title: string;
  description: string;
}

export type ProjectStatus = "continuo" | "encerrado";

export interface ProjectView {
  slug: string;
  title: string;
  period: string;
  /** UI temporária — ACF `tipo` ainda não existe no CMS. */
  type?: string;
  status?: ProjectStatus;
  excerpt: string;
  descriptionText: string | null;
  featuredImage?: ImageAsset;
  /** Galeria principal: `atelie_gallery`; fallback visual usa `featuredImage`. */
  gallery: ImageAsset[];
  video?: ContentVideo;
  participants?: string;
  curation?: string;
  location?: string;
}

export interface ArchivePageView {
  title: string;
  intro: string;
  sliderImages: ImageAsset[];
}

export type EventStatus = "futuro" | "em-andamento" | "encerrado";

/** UI temporária — o CMS hoje só expõe `evento_online`. */
export type EventModality = "presencial" | "online" | "hibrido";

export interface EventView {
  slug: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  modality: EventModality;
  status: EventStatus;
  type?: string;
  excerpt: string;
  descriptionText: string | null;
  featuredImage?: ImageAsset;
  participants?: string;
  registration?: {
    label: string;
    href?: string;
    note?: string;
  };
}

export interface EventsPageView {
  title: string;
  intro: string;
}

export type CourseModality = "presencial" | "online" | "hibrido";
export type CourseStatus = "inscricoes-abertas" | "em-andamento" | "encerrado";

export interface CourseView {
  slug: string;
  title: string;
  period: string;
  modality?: CourseModality;
  status: CourseStatus;
  type?: string;
  workload?: string;
  audience?: string;
  location?: string;
  excerpt: string;
  descriptionText: string | null;
  featuredImage?: ImageAsset;
  registration?: {
    label: string;
    href?: string;
    note?: string;
  };
}

export interface CoursesPageView {
  title: string;
  intro: string;
}

export interface AboutBlock {
  id: string;
  title: string;
  paragraphs: string[];
  image?: ImageAsset;
}

export interface AboutLetter {
  quote: string;
  attribution: string;
  note?: string;
}

export interface AboutComplementarySection {
  title: string;
  items: string[];
}

export interface AboutPageView {
  title: string;
  intro: string;
  identity?: AboutBlock;
  origin?: AboutBlock;
  letter?: AboutLetter;
  practices?: {
    id: string;
    title: string;
    intro: string;
    items: string[];
    note: string;
  };
  territory?: AboutBlock;
  luanda?: AboutBlock;
  complementary?: {
    title: string;
    sections: AboutComplementarySection[];
  };
  links: RelatedLink[];
}

export interface ContactPageView {
  title: string;
  intro: string;
  whatsappNote: string;
}
