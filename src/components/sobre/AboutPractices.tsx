interface AboutPracticesProps {
  id: string;
  title: string;
  intro: string;
  items: string[];
  note: string;
}

export function AboutPractices({ id, title, intro, items, note }: AboutPracticesProps) {
  return (
    <section id={id} className="scroll-mt-28 space-y-8">
      {title ? (
        <h2 className="font-display text-3xl font-light tracking-wide md:text-4xl">{title}</h2>
      ) : null}

      {intro ? (
        <p className="whitespace-pre-line text-base leading-relaxed text-foreground/90 md:text-lg">
          {intro}
        </p>
      ) : null}

      {items.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item}
              className="whitespace-pre-line border-t border-border pt-3 text-sm leading-relaxed text-foreground/85"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {note ? (
        <p className="whitespace-pre-line text-sm leading-relaxed text-muted">{note}</p>
      ) : null}
    </section>
  );
}
