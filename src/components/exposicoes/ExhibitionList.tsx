import type { ExhibitionView } from "@/types/views";

import { ExhibitionCard } from "./ExhibitionCard";

interface ExhibitionListProps {
  exhibitions: ExhibitionView[];
}

export function ExhibitionList({ exhibitions }: ExhibitionListProps) {
  if (exhibitions.length === 0) {
    return (
      <p className="mx-auto max-w-4xl px-6 pb-20 text-sm text-muted md:px-10 md:pb-24">
        Nenhuma exposição para exibir.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-6 pb-20 sm:pb-24 md:px-10">
      {exhibitions.map((exhibition) => (
        <ExhibitionCard key={exhibition.slug} exhibition={exhibition} />
      ))}
    </div>
  );
}
