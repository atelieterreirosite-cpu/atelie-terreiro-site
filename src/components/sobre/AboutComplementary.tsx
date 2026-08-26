import type { AboutComplementarySection } from "@/types/views";

interface AboutComplementaryProps {
  title: string;
  sections: AboutComplementarySection[];
}

export function AboutComplementary({ title, sections }: AboutComplementaryProps) {
  return (
    <section id="complementar" className="scroll-mt-28 border-t border-border pt-12">
      {title ? (
        <h2 className="font-display text-2xl font-light tracking-wide md:text-3xl lg:text-4xl">
          {title}
        </h2>
      ) : null}

      {sections.length > 0 ? (
        <div
          className={`grid gap-12 md:gap-10 lg:gap-16 ${title ? "mt-10 md:mt-14" : ""} ${
            sections.length >= 3 ? "md:grid-cols-3" : sections.length === 2 ? "md:grid-cols-2" : ""
          }`}
        >
          {sections.map((section) => (
            <div key={section.title} className="space-y-5">
              {section.title ? (
                <h3 className="text-xs tracking-[0.15em] text-muted-light uppercase">
                  {section.title}
                </h3>
              ) : null}
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="whitespace-pre-line text-sm leading-relaxed text-foreground/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
