import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventDetail } from "@/components/eventos/EventDetail";
import { SiteShell } from "@/components/layout/SiteShell";
import { getEventBySlugForView, getEventSlugsForStaticParams } from "@/lib/adapters/event";

export const dynamic = "force-static";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getEventSlugsForStaticParams();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlugForView(slug);

  if (!event) {
    return { title: "Evento não encontrado" };
  }

  return {
    title: event.title,
    description: event.excerpt || undefined,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlugForView(slug);

  if (!event) {
    notFound();
  }

  return (
    <SiteShell>
      <EventDetail event={event} />
    </SiteShell>
  );
}
