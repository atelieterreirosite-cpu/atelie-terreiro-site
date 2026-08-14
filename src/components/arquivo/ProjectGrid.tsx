import type { ProjectView } from "@/types/views";

import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: ProjectView[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="mx-auto max-w-7xl px-6 pb-20 text-sm text-muted md:px-10 md:pb-24">
        Nenhum projeto para exibir.
      </p>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-12 px-6 pb-20 sm:gap-y-16 sm:pb-24 md:grid-cols-2 md:px-10 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
