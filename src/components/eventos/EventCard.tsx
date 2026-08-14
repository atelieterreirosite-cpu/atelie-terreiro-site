import Image from "next/image";
import Link from "next/link";

import type { EventModality, EventView } from "@/types/views";

import { EventStatusBadge } from "./EventStatusBadge";

interface EventCardProps {
  event: EventView;
}

const modalityLabels: Record<EventModality, string> = {
  presencial: "Presencial",
  online: "Online",
  hibrido: "Híbrido",
};

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="group border-t border-border pt-8 first:border-t-0 first:pt-0">
      <Link
        href={`/eventos/${event.slug}/`}
        className="grid gap-5 sm:gap-6 md:grid-cols-[minmax(0,140px)_1fr] md:gap-10"
      >
        <div className="space-y-2 sm:space-y-3">
          <EventStatusBadge status={event.status} />
          {event.date ? (
            <p className="font-display text-xl leading-tight font-light tracking-wide sm:text-2xl md:text-3xl">
              {event.date}
            </p>
          ) : null}
          {event.time ? <p className="text-sm text-muted">{event.time}</p> : null}
        </div>

        <div className="space-y-4">
          {event.featuredImage ? (
            <div className="relative aspect-[16/9] overflow-hidden bg-accent/5 md:hidden">
              <Image
                src={event.featuredImage.src}
                alt={event.featuredImage.alt}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 motion-reduce:transition-none max-md:group-active:scale-[1.01] md:group-hover:scale-[1.02]"
              />
            </div>
          ) : null}

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {event.type ? (
              <p className="text-xs tracking-[0.12em] text-muted-light uppercase">{event.type}</p>
            ) : null}
            <p className="text-xs text-muted">{modalityLabels[event.modality]}</p>
          </div>

          <h2 className="font-display text-xl leading-snug font-light tracking-wide transition-colors duration-300 group-hover:text-accent sm:text-2xl md:text-3xl">
            {event.title}
          </h2>

          {event.location ? (
            <p className="text-sm leading-relaxed text-muted">{event.location}</p>
          ) : null}

          <p className="line-clamp-2 text-sm leading-relaxed text-foreground/80">{event.excerpt}</p>

          {event.registration && event.status !== "encerrado" ? (
            <p className="text-xs tracking-[0.1em] text-foreground/70 uppercase">
              {event.registration.label}
            </p>
          ) : null}

          <span className="link-underline inline-block text-xs tracking-[0.12em] text-foreground/70 uppercase">
            Ver evento
          </span>
        </div>
      </Link>
    </article>
  );
}
