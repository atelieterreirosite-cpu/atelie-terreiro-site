import Link from "next/link";

import { EditorialText } from "@/components/ui/EditorialText";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import type { ContentVideo, ImageAsset, ProjectView } from "@/types/views";

interface ProjectDetailProps {
  project: ProjectView;
}

function resolveSliderImages(project: ProjectView): ImageAsset[] {
  if (project.gallery.length > 0) {
    return project.gallery;
  }
  if (project.featuredImage) {
    return [project.featuredImage];
  }
  return [];
}

function ProjectVideo({ video }: { video: ContentVideo }) {
  return (
    <div className="relative aspect-video overflow-hidden bg-accent">
      <VideoEmbed
        video={video}
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const sliderImages = resolveSliderImages(project);
  const videoAsHero = Boolean(project.video) && sliderImages.length === 0;

  return (
    <article className="pb-24">
      <div className="mx-auto max-w-7xl px-6 pt-8 md:px-10 md:pt-12">
        <Link
          href="/arquivo/"
          className="link-underline inline-flex items-center gap-2 text-xs tracking-[0.12em] text-muted uppercase transition-colors duration-300 hover:text-foreground"
        >
          ← Projetos
        </Link>
      </div>

      <header className="mx-auto max-w-3xl px-6 pt-10 md:px-10 md:pt-14">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <p className="text-sm tracking-[0.12em] text-muted-light uppercase">{project.period}</p>
          {project.type ? <p className="text-sm text-muted">{project.type}</p> : null}
          {project.status ? (
            <p className="text-xs tracking-[0.1em] text-muted-light uppercase">
              {project.status === "continuo" ? "Em curso" : "Encerrado"}
            </p>
          ) : null}
        </div>

        <h1 className="font-display mt-4 text-3xl leading-tight font-light tracking-wide text-balance sm:text-4xl md:text-5xl lg:text-6xl">
          {project.title}
        </h1>
      </header>

      <div className="mx-auto mt-12 max-w-7xl px-6 md:px-10">
        {sliderImages.length > 0 ? (
          <ImageSlider images={sliderImages} label={`Imagens de ${project.title}`} />
        ) : project.video ? (
          <ProjectVideo video={project.video} />
        ) : (
          <MediaPlaceholder />
        )}
      </div>

      <div className="mx-auto mt-16 max-w-3xl space-y-16 px-6 md:px-10">
        {project.descriptionText ? (
          <section className="space-y-4">
            <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Descrição</h2>
            <EditorialText
              text={project.descriptionText}
              className="text-base leading-relaxed text-foreground/90"
            />
          </section>
        ) : null}

        {project.externalLink ? (
          <a
            href={project.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-block text-sm tracking-[0.12em] text-foreground uppercase"
          >
            Link externo →
          </a>
        ) : null}

        {(project.participants || project.curation || project.location) && (
          <section className="space-y-6 border-t border-border pt-12">
            <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Informações</h2>
            <dl className="space-y-4">
              {project.location ? (
                <div>
                  <dt className="text-sm font-medium text-foreground">Local</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{project.location}</dd>
                </div>
              ) : null}
              {project.curation ? (
                <div>
                  <dt className="text-sm font-medium text-foreground">Curadoria / coordenação</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{project.curation}</dd>
                </div>
              ) : null}
              {project.participants ? (
                <div>
                  <dt className="text-sm font-medium text-foreground">Participantes</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">
                    {project.participants}
                  </dd>
                </div>
              ) : null}
            </dl>
          </section>
        )}

        {project.video && !videoAsHero ? (
          <section className="space-y-8">
            <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Vídeo</h2>
            <div className="space-y-3">
              <ProjectVideo video={project.video} />
              {project.video.description ? (
                <p className="text-sm text-muted">{project.video.description}</p>
              ) : null}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
