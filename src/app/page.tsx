import { HomeHero } from "@/components/home/HomeHero";
import { Header } from "@/components/layout/Header";
import { loadHomeVideoForView, loadSiteInfoForView } from "@/lib/adapters/site";

export const dynamic = "force-static";

/**
 * Home visual: vídeo fullscreen + Header overlay.
 * Sem SiteShell (Header solid + Footer) — o overlay precisa ficar sobre o vídeo.
 *
 * Vídeo e nome vêm de Options. Sem arquivo/URL, o player não é renderizado.
 */
export default async function Home() {
  const [site, video] = await Promise.all([loadSiteInfoForView(), loadHomeVideoForView()]);

  return (
    <>
      <Header variant="overlay" siteName={site.name} />
      <main className="flex-1">
        <HomeHero video={video} />
      </main>
    </>
  );
}
