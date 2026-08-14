import type { EventView } from "@/types/views";

import { EventCard } from "./EventCard";

interface EventSectionProps {
  title: string;
  events: EventView[];
}

function EventSection({ title, events }: EventSectionProps) {
  if (events.length === 0) {
    return null;
  }

  return (
    <section className="space-y-10">
      <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">{title}</h2>
      <div className="space-y-10">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </section>
  );
}

interface EventListProps {
  upcoming: EventView[];
  ongoing: EventView[];
  past: EventView[];
}

export function EventList({ upcoming, ongoing, past }: EventListProps) {
  const isEmpty = upcoming.length === 0 && ongoing.length === 0 && past.length === 0;

  if (isEmpty) {
    return (
      <p className="mx-auto max-w-4xl px-6 pb-20 text-sm text-muted md:px-10 md:pb-24">
        Nenhum evento para exibir.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-16 px-6 pb-20 sm:space-y-20 sm:pb-24 md:px-10">
      <EventSection title="Próximos eventos" events={upcoming} />
      <EventSection title="Em andamento" events={ongoing} />
      <EventSection title="Eventos passados" events={past} />
    </div>
  );
}
