import { EditorialText } from "@/components/ui/EditorialText";
import type { AboutComplementarySection } from "@/types/views";

interface AboutComplementaryProps {
  title: string;
  sections: AboutComplementarySection[];
}

export function AboutComplementary({ title, sections }: AboutComplementaryProps) {
  return (
    <section id="complementar" className="scroll-mt-28 border-t border-border pt-12">
      {title ? (
        <h2 className="font-display text-xl font-light tracking-wide md:text-2xl lg:text-3xl">
          {title}
        </h2>
      ) : null}

      {sections.length > 0 ? (
        <div className={`space-y-10 md:space-y-12 ${title ? "mt-10 md:mt-14" : ""}`}>
          {sections.map((section, index) => (
            <div key={`${section.title}-${index}`} className="space-y-3">
              {section.title ? (
                <h3 className="text-sm tracking-[0.12em] text-foreground uppercase md:text-base">
                  {section.title}
                </h3>
              ) : null}
              {section.description ? (
                <EditorialText
                  text={section.description}
                  className="text-sm leading-relaxed text-foreground/80"
                />
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
