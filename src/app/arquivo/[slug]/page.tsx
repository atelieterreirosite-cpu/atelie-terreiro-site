import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/arquivo/ProjectDetail";
import { SiteShell } from "@/components/layout/SiteShell";
import {
  getProjectBySlugForView,
  getProjectSlugsForStaticParams,
} from "@/lib/adapters/project";

export const dynamic = "force-static";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugsForStaticParams();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlugForView(slug);

  if (!project) {
    return { title: "Projeto não encontrado" };
  }

  return {
    title: project.title,
    description: project.excerpt || undefined,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlugForView(slug);

  if (!project) {
    notFound();
  }

  return (
    <SiteShell>
      <ProjectDetail project={project} />
    </SiteShell>
  );
}
