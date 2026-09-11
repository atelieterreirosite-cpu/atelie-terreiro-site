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
  const hasImage = Boolean(event.featuredImage);

  return (
    <article className="group border-t border-border pt-8 first:border-t-0 first:pt-0">
      <Link
        href={`/eventos/${event.slug}/`}
        className={
          hasImage
            ? "grid gap-5 sm:gap-6 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:items-start md:gap-10"
            : "grid gap-5 sm:gap-6"
        }
      >
        {/* Meta só no mobile — no desktop vai para a coluna de texto */}
        <div className="space-y-2 sm:space-y-3 md:hidden">
          <EventStatusBadge status={event.status} />
          {event.date ? (
            <p className="font-display text-xs leading-tight font-light tracking-wide sm:text-sm">
              {event.date}
            </p>
          ) : null}
          {event.time ? <p className="text-sm text-muted">{event.time}</p> : null}
        </div>

        {event.featuredImage ? (
          <div className="flex max-h-[min(45vh,320px)] max-w-full items-center justify-center md:max-h-[260px] md:self-start">
            <Image
              src={event.featuredImage.src}
              alt={event.featuredImage.alt}
              width={event.featuredImage.width ?? 1600}
              height={event.featuredImage.height ?? 1200}
              sizes="(max-width: 768px) 100vw, 280px"
              className="h-auto max-h-[min(45vh,320px)] w-auto max-w-full object-contain transition-opacity duration-500 motion-reduce:transition-none group-hover:opacity-90 md:max-h-[260px]"
            />
          </div>
        ) : null}

        <div className="space-y-4 md:min-w-0">
          <div className="hidden flex-wrap items-baseline gap-x-4 gap-y-2 md:flex">
            <EventStatusBadge status={event.status} />
            {event.date ? (
              <p className="font-display text-sm leading-none font-light tracking-wide lg:text-base">
                {event.date}
              </p>
            ) : null}
            {event.time ? <p className="text-sm text-muted">{event.time}</p> : null}
          </div>

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {event.type ? (
              <p className="text-xs tracking-[0.12em] text-muted-light uppercase">{event.type}</p>
            ) : null}
            <p className="text-xs text-muted">{modalityLabels[event.modality]}</p>
          </div>

          <h2 className="font-display text-sm leading-snug font-light tracking-wide transition-colors duration-300 group-hover:text-accent sm:text-base md:text-lg">
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
