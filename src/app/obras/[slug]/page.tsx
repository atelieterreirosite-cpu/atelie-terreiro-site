import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WorkDetail } from "@/components/obras/WorkDetail";
import { SiteShell } from "@/components/layout/SiteShell";
import { getWorkBySlugForView, getWorkSlugsForStaticParams } from "@/lib/adapters/work";

export const dynamic = "force-static";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getWorkSlugsForStaticParams();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkBySlugForView(slug);

  if (!work) {
    return { title: "Obra não encontrada" };
  }

  return {
    title: work.title,
    description: work.excerpt || undefined,
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = await getWorkBySlugForView(slug);

  if (!work) {
    notFound();
  }

  return (
    <SiteShell>
      <WorkDetail work={work} />
    </SiteShell>
  );
}
