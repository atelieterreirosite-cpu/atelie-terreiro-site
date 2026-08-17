import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ExhibitionDetail } from "@/components/exposicoes/ExhibitionDetail";
import { SiteShell } from "@/components/layout/SiteShell";
import {
  getExhibitionBySlugForView,
  getExhibitionSlugsForStaticParams,
} from "@/lib/adapters/exhibition";

export const dynamic = "force-static";

interface ExhibitionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getExhibitionSlugsForStaticParams();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ExhibitionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const exhibition = await getExhibitionBySlugForView(slug);

  if (!exhibition) {
    return { title: "Exposição não encontrada" };
  }

  return {
    title: exhibition.title,
    description: exhibition.excerpt || undefined,
  };
}

export default async function ExhibitionPage({ params }: ExhibitionPageProps) {
  const { slug } = await params;
  const exhibition = await getExhibitionBySlugForView(slug);

  if (!exhibition) {
    notFound();
  }

  return (
    <SiteShell>
      <ExhibitionDetail exhibition={exhibition} />
    </SiteShell>
  );
}
