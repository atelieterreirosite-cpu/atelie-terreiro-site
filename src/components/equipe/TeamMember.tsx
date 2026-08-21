import Image from "next/image";

import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { TeamMemberMock } from "@/data/equipe";

import { TeamMemberBio } from "./TeamMemberBio";

interface TeamMemberProps {
  member: TeamMemberMock;
  index: number;
}

function memberAnchor(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function padIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function TeamMember({ member, index }: TeamMemberProps) {
  const imageOnRight = index % 2 === 1;
  const anchor = memberAnchor(member.name);
  const hasImage = Boolean(member.image?.trim());

  return (
    <article
      id={anchor || undefined}
      className="scroll-mt-28 grid items-start gap-8 md:gap-10 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-20"
    >
      <figure
        className={`lg:col-span-6 ${imageOnRight ? "lg:col-start-7" : "lg:col-start-1"}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-accent/5">
          {hasImage ? (
            <Image
              src={member.image!}
              alt={`Retrato de ${member.name}`}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <MediaPlaceholder
              label="Retrato não disponível"
              className="absolute inset-0 aspect-auto h-full min-h-full"
            />
          )}
        </div>
      </figure>

      <div
        className={`lg:col-span-5 ${
          imageOnRight
            ? "lg:col-start-1 lg:row-start-1"
            : "lg:col-start-8"
        } lg:pt-2 xl:pt-6`}
      >
        <p className="text-xs tracking-[0.2em] text-muted-light uppercase">
          {padIndex(index)}
        </p>

        <h2 className="font-display mt-4 text-4xl leading-none font-light tracking-wide sm:text-5xl md:text-6xl lg:text-7xl">
          {member.name}
        </h2>

        {member.role ? (
          <p className="mt-4 max-w-md text-xs leading-relaxed tracking-[0.12em] text-muted uppercase">
            {member.role}
          </p>
        ) : null}

        <TeamMemberBio bio={member.bio} bioFull={member.bioFull} />

        {member.areas && member.areas.length > 0 ? (
          <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-6 md:mt-12">
            {member.areas.map((area) => (
              <li
                key={area}
                className="text-xs tracking-[0.12em] text-muted-light uppercase"
              >
                {area}
              </li>
            ))}
          </ul>
        ) : null}

        {member.links && member.links.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {member.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-xs tracking-[0.12em] text-foreground/80 uppercase transition-colors duration-300 hover:text-foreground motion-reduce:transition-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
