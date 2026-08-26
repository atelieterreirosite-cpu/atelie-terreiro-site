import { EditorialText } from "@/components/ui/EditorialText";
import type { AboutPracticeItem } from "@/types/views";

interface AboutPracticesProps {
  id: string;
  title: string;
  intro: string;
  items: AboutPracticeItem[];
  note: string;
}

export function AboutPractices({ id, title, intro, items, note }: AboutPracticesProps) {
  return (
    <section id={id} className="scroll-mt-28 space-y-8">
      {title ? (
        <h2 className="font-display text-3xl font-light tracking-wide md:text-4xl">{title}</h2>
      ) : null}

      <EditorialText
        text={intro}
        className="text-base leading-relaxed text-foreground/90 md:text-lg"
      />

      {items.length > 0 ? (
        <ul className="grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10">
          {items.map((item, index) => (
            <li key={`${item.title}-${index}`} className="space-y-2 border-t border-border pt-4">
              <h3 className="text-sm tracking-[0.12em] text-foreground uppercase">
                {item.title}
              </h3>
              {item.description ? (
                <EditorialText
                  text={item.description}
                  className="text-sm leading-relaxed text-foreground/85"
                />
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      <EditorialText text={note} className="text-sm leading-relaxed text-muted" />
    </section>
  );
}
