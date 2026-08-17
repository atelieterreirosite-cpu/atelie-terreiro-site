import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/layout/SiteShell";
import { VideoDetail } from "@/components/videos/VideoDetail";
import {
  getVideoBySlugForView,
  getVideoSlugsForStaticParams,
} from "@/lib/adapters/videos";

export const dynamic = "force-static";

interface VideoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getVideoSlugsForStaticParams();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideoBySlugForView(slug);

  if (!video) {
    return { title: "Vídeo não encontrado" };
  }

  return {
    title: video.title,
    description: video.excerpt || undefined,
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const video = await getVideoBySlugForView(slug);

  if (!video) {
    notFound();
  }

  return (
    <SiteShell>
      <VideoDetail video={video} />
    </SiteShell>
  );
}
