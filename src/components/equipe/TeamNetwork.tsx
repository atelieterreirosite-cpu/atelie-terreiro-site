import Image from "next/image";

import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { GuideView } from "@/types/views";

interface TeamNetworkProps {
  kicker: string;
  title: string;
  text: string;
  members: GuideView[];
}

export function TeamNetwork({ kicker, title, text, members }: TeamNetworkProps) {
  if (members.length === 0) {
    return null;
  }

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
            className="font-display text-3xl leading-tight font-light tracking-wide sm:text-4xl md:text-5xl"
          >
            {title}
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">{text}</p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:mt-16 md:gap-x-8 md:gap-y-12 lg:grid-cols-4 xl:grid-cols-5">
          {members.map((member) => {
            const imageSrc = member.image?.src?.trim();
            const imageAlt = member.image?.alt?.trim() || member.name;

            return (
              <li key={member.slug || String(member.id)}>
                <figure className="space-y-3">
                  <div className="relative aspect-[3/4] overflow-hidden bg-accent/5">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                        className="object-cover"
                      />
                    ) : (
                      <MediaPlaceholder
                        label={member.name}
                        className="absolute inset-0 aspect-auto h-full min-h-full"
                      />
                    )}
                  </div>
                  <figcaption className="font-display text-lg leading-snug font-light tracking-wide text-foreground/90 sm:text-xl">
                    {member.name}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
