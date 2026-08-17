import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/layout/SiteShell";
import { PublicationDetail } from "@/components/publicacoes/PublicationDetail";
import {
  getPublicationBySlugForView,
  getPublicationSlugsForStaticParams,
} from "@/lib/adapters/publication";

export const dynamic = "force-static";

interface PublicationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPublicationSlugsForStaticParams();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PublicationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = await getPublicationBySlugForView(slug);

  if (!publication) {
    return { title: "Publicação não encontrada" };
  }

  return {
    title: publication.title,
    description: publication.excerpt || undefined,
  };
}

export default async function PublicationPage({ params }: PublicationPageProps) {
  const { slug } = await params;
  const publication = await getPublicationBySlugForView(slug);

  if (!publication) {
    notFound();
  }

  return (
    <SiteShell>
      <PublicationDetail publication={publication} />
    </SiteShell>
  );
}
