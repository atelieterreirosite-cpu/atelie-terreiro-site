import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { VideoGrid } from "@/components/videos/VideoGrid";
import { loadVideos } from "@/lib/adapters/videos";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Vídeos",
  description: "Vídeos do Ateliê Terreiro.",
};

export default async function VideosPage() {
  const collection = await loadVideos();

  return (
    <SiteShell>
      <PageHero title="Vídeos" />
      {collection.status === "error" ? (
        <p className="mx-auto max-w-7xl px-6 pb-20 text-sm text-muted md:px-10 md:pb-24">
          Não foi possível carregar os vídeos.
        </p>
      ) : (
        <VideoGrid videos={collection.items} />
      )}
    </SiteShell>
  );
}
