import type { Metadata } from "next";

import { ContactChannels } from "@/components/contato/ContactChannels";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { loadContactPageForView } from "@/lib/adapters/contact";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contato",
  description: "Canais e localização do Ateliê Terreiro.",
};

export default async function ContatoPage() {
  const { page, site } = await loadContactPageForView();

  return (
    <SiteShell>
      <PageHero title={page.title} intro={page.intro} />
      <div className="mx-auto max-w-3xl px-6 pb-20 md:px-10 md:pb-24">
        <ContactChannels
          siteName={site.name}
          address={site.address}
          contact={site.contact}
          social={site.social}
          whatsappNote={page.whatsappNote}
        />
      </div>
    </SiteShell>
  );
}
