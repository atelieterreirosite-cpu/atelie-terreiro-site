import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageEnter } from "@/components/layout/PageEnter";
import { loadSiteInfoForView } from "@/lib/adapters/site";

interface SiteShellProps {
  children: React.ReactNode;
}

/**
 * Layout para páginas internas (não-Home).
 * A Home usará Header overlay sem este shell.
 */
export async function SiteShell({ children }: SiteShellProps) {
  const site = await loadSiteInfoForView();

  return (
    <>
      <Header variant="solid" siteName={site.name} />
      <main id="conteudo-principal" className="flex-1">
        <PageEnter>{children}</PageEnter>
      </main>
      <Footer site={site} />
    </>
  );
}
