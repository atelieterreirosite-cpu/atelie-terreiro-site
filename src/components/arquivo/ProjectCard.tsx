import Image from "next/image";
import Link from "next/link";

import type { ProjectView } from "@/types/views";

interface ProjectCardProps {
  project: ProjectView;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const href = `/arquivo/${project.slug}/`;

  return (
    <article className="group">
      <Link href={href} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-accent/5 sm:aspect-[3/4]">
          {project.featuredImage ? (
            <Image
              src={project.featuredImage.src}
              alt={project.featuredImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out motion-reduce:transition-none max-md:group-active:scale-[1.02] md:group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs tracking-[0.12em] text-muted-light uppercase">
              Sem imagem
            </div>
          )}
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-xs tracking-[0.12em] text-muted-light uppercase">
              {project.period}
            </p>
            {project.type ? <p className="text-xs text-muted">{project.type}</p> : null}
          </div>

          <h2 className="font-display text-xl leading-snug font-light tracking-wide transition-colors duration-300 group-hover:text-accent sm:text-2xl md:text-3xl">
            {project.title}
          </h2>

          <p className="line-clamp-2 text-sm leading-relaxed text-muted">{project.excerpt}</p>

          <span className="link-underline inline-block pt-1 text-xs tracking-[0.12em] text-foreground/70 uppercase">
            Ver projeto
          </span>
        </div>
      </Link>
    </article>
  );
}
