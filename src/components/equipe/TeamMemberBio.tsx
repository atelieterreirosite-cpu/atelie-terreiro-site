"use client";

import { useId, useState } from "react";

import { EditorialText } from "@/components/ui/EditorialText";

interface TeamMemberBioProps {
  bio: string;
  bioFull?: string;
}

export function TeamMemberBio({ bio, bioFull }: TeamMemberBioProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const hasFull = Boolean(bioFull && bioFull.trim() && bioFull.trim() !== bio.trim());
  const text = expanded && hasFull ? bioFull : bio;

  return (
    <div className="mt-8 space-y-4 md:mt-10">
      <EditorialText
        text={text}
        className="text-base leading-relaxed text-foreground/90 md:text-lg"
      />

      {hasFull ? (
        <div>
          <button
            type="button"
            className="link-underline text-xs tracking-[0.12em] text-muted uppercase transition-colors duration-300 hover:text-foreground motion-reduce:transition-none"
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "Ler menos" : "Ler mais"}
          </button>
          <span id={panelId} className="sr-only">
            {expanded ? "Biografia completa visível" : "Biografia completa oculta"}
          </span>
        </div>
      ) : null}
    </div>
  );
}
