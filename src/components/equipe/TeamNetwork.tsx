"use client";

import Image from "next/image";
import { useState } from "react";

import { MediaLightbox } from "@/components/ui/MediaLightbox";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { GuideView } from "@/types/views";

interface TeamNetworkProps {
  kicker: string;
  title: string;
  text: string;
  members: GuideView[];
}

export function TeamNetwork({ kicker, title, text, members }: TeamNetworkProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  if (members.length === 0) {
    return null;
  }

  const activeMember =
    activeSlug === null
      ? null
      : members.find((member) => (member.slug || String(member.id)) === activeSlug) ?? null;

  return (
    <section
      aria-labelledby="equipe-rede-title"
      className="border-t border-border pb-20 md:pb-28"
    >
      <div className="mx-auto max-w-7xl px-6 pt-16 md:px-10 md:pt-24 lg:pt-28">
        <div className="max-w-xl space-y-5">
          <p className="text-xs tracking-[0.15em] text-muted-light uppercase">{kicker}</p>
          <h2
            id="equipe-rede-title"
            className="font-display text-2xl leading-tight font-light tracking-wide sm:text-3xl md:text-4xl"
          >
            {title}
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">{text}</p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:mt-16 md:gap-x-8 md:gap-y-12 lg:grid-cols-4 xl:grid-cols-5">
          {members.map((member) => {
            const memberKey = member.slug || String(member.id);
            const imageSrc = member.image?.src?.trim();
            const imageAlt = member.image?.alt?.trim() || member.name;
            const canOpen = Boolean(imageSrc);

            return (
              <li key={memberKey}>
                <figure className="space-y-3">
                  {canOpen && member.image ? (
                    <button
                      type="button"
                      onClick={() => setActiveSlug(memberKey)}
                      className="group relative aspect-[3/4] w-full overflow-hidden bg-accent/5 text-left focus-visible:outline-offset-4"
                      aria-label={`Ver detalhes de ${member.name}`}
                    >
                      <Image
                        src={imageSrc!}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                        className="object-cover transition-opacity duration-500 motion-reduce:transition-none group-hover:opacity-90"
                      />
                    </button>
                  ) : (
                    <div className="relative aspect-[3/4] overflow-hidden bg-accent/5">
                      <MediaPlaceholder
                        label={member.name}
                        className="absolute inset-0 aspect-auto h-full min-h-full"
                      />
                    </div>
                  )}
                  <figcaption className="font-display text-base leading-snug font-light tracking-wide text-foreground/90 sm:text-lg">
                    {member.name}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>

      {activeMember?.image ? (
        <MediaLightbox
          open
          image={activeMember.image}
          title={activeMember.name}
          description={activeMember.description}
          onClose={() => setActiveSlug(null)}
        />
      ) : null}
    </section>
  );
}
