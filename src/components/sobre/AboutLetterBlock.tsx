import type { AboutLetter } from "@/types/views";

interface AboutLetterBlockProps {
  letter: AboutLetter;
}

export function AboutLetterBlock({ letter }: AboutLetterBlockProps) {
  return (
    <figure className="border-l border-accent/30 py-2 pl-6 md:pl-10">
      <blockquote className="font-display whitespace-pre-line text-xl leading-relaxed font-light tracking-wide text-foreground/95 md:text-2xl md:leading-relaxed">
        {letter.quote}
      </blockquote>
      <figcaption className="mt-6 space-y-2">
        <cite className="text-sm tracking-[0.08em] text-muted not-italic">{letter.attribution}</cite>
        {letter.note ? (
          <p className="text-xs leading-relaxed text-muted-light">{letter.note}</p>
        ) : null}
      </figcaption>
    </figure>
  );
}
