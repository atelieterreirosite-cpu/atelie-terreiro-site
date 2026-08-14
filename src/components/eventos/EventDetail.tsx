import Image from "next/image";
import Link from "next/link";

import { EditorialText } from "@/components/ui/EditorialText";
import type { EventModality, EventView } from "@/types/views";

import { EventStatusBadge } from "./EventStatusBadge";

interface EventDetailProps {
  event: EventView;
}

const modalityLabels: Record<EventModality, string> = {
  presencial: "Presencial",
  online: "Online",
  hibrido: "Híbrido",
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[120px_1fr] sm:gap-4">
      <dt className="text-xs tracking-[0.12em] text-muted-light uppercase">{label}</dt>
      <dd className="text-sm leading-relaxed text-foreground/90">{value}</dd>
    </div>
  );
}

export function EventDetail({ event }: EventDetailProps) {
  const showRegistration = event.registration && event.status !== "encerrado";

  return (
    <article className="pb-24">
      <div className="mx-auto max-w-4xl px-6 pt-8 md:px-10 md:pt-12">
        <Link
          href="/eventos/"
          className="link-underline inline-flex items-center gap-2 text-xs tracking-[0.12em] text-muted uppercase transition-colors duration-300 hover:text-foreground"
        >
          ← Eventos
        </Link>
      </div>

      <header className="mx-auto max-w-4xl px-6 pt-10 md:px-10 md:pt-14">
        <div className="mb-4">
          <EventStatusBadge status={event.status} />
        </div>

        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          {event.type ? (
            <p className="text-sm tracking-[0.12em] text-muted-light uppercase">{event.type}</p>
          ) : null}
          <p className="text-sm text-muted">{modalityLabels[event.modality]}</p>
        </div>

        <h1 className="font-display mt-4 text-3xl leading-tight font-light tracking-wide text-balance sm:text-4xl md:text-5xl">
          {event.title}
        </h1>
      </header>

      <div className="mx-auto mt-10 max-w-4xl px-6 md:px-10">
        <dl className="space-y-4 border-y border-border py-8">
          {event.date ? <InfoRow label="Data" value={event.date} /> : null}
          {event.time ? <InfoRow label="Horário" value={event.time} /> : null}
          {event.location ? <InfoRow label="Local" value={event.location} /> : null}
          <InfoRow label="Modalidade" value={modalityLabels[event.modality]} />
        </dl>
      </div>

      {event.featuredImage ? (
        <div className="mx-auto mt-12 max-w-4xl px-6 md:px-10">
          <div className="relative aspect-[16/9] overflow-hidden bg-accent/5">
            <Image
              src={event.featuredImage.src}
              alt={event.featuredImage.alt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <div className="mx-auto mt-16 max-w-3xl space-y-12 px-6 md:px-10">
        {event.descriptionText ? (
          <section className="space-y-4">
            <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Descrição</h2>
            <EditorialText
              text={event.descriptionText}
              className="text-base leading-relaxed text-foreground/90"
            />
          </section>
        ) : null}

        {showRegistration && event.registration ? (
          <section className="space-y-4 border border-border bg-surface p-6 md:p-8">
            <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Participação</h2>
            <p className="text-base text-foreground/90">{event.registration.label}</p>
            {event.registration.note ? (
              <p className="text-sm text-muted">{event.registration.note}</p>
            ) : null}
            {event.registration.href ? (
              <a
                href={event.registration.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-block pt-2 text-sm tracking-[0.12em] text-foreground uppercase"
              >
                Acessar inscrição →
              </a>
            ) : null}
          </section>
        ) : null}

        {event.participants ? (
          <section className="space-y-4">
            <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Participantes</h2>
            <p className="text-sm leading-relaxed text-muted">{event.participants}</p>
          </section>
        ) : null}
      </div>
    </article>
  );
}
