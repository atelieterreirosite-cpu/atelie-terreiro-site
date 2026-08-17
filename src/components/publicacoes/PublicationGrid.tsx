import type { PublicationView } from "@/types/views";

import { PublicationCard } from "./PublicationCard";

interface PublicationGridProps {
  publications: PublicationView[];
}

export function PublicationGrid({ publications }: PublicationGridProps) {
  if (publications.length === 0) {
    return (
      <p className="mx-auto max-w-7xl px-6 pb-20 text-sm text-muted md:px-10 md:pb-24">
        Nenhuma publicação para exibir.
      </p>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-12 px-6 pb-20 sm:gap-y-16 sm:pb-24 md:grid-cols-2 md:px-10 lg:grid-cols-3">
      {publications.map((publication) => (
        <PublicationCard key={publication.slug} publication={publication} />
      ))}
    </div>
  );
}
