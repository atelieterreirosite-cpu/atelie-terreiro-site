import type { Metadata } from "next";

import { EventList } from "@/components/eventos/EventList";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { loadEventsPageForView } from "@/lib/adapters/editorial";
import { loadGroupedEvents } from "@/lib/adapters/event";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Eventos",
  description: "Programação pública do Ateliê Terreiro.",
};

export default async function EventosPage() {
  const [{ page }, collection] = await Promise.all([
    loadEventsPageForView(),
    loadGroupedEvents(),
  ]);

  return (
    <SiteShell>
      <PageHero title={page.title} intro={page.intro} />
      {collection.status === "error" ? (
        <p className="mx-auto max-w-4xl px-6 pb-20 text-sm text-muted md:px-10 md:pb-24">
          Não foi possível carregar os eventos.
        </p>
      ) : (
        <EventList
          upcoming={collection.upcoming}
          ongoing={collection.ongoing}
          past={collection.past}
        />
      )}
    </SiteShell>
  );
}
