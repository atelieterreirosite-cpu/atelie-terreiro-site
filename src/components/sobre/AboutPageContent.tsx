import type { AboutPageView } from "@/types/views";

import { AboutComplementary } from "./AboutComplementary";
import { AboutLetterBlock } from "./AboutLetterBlock";
import { AboutLinks, AboutPageNav } from "./AboutPageNav";
import { AboutPractices } from "./AboutPractices";
import { AboutSection } from "./AboutSection";

interface AboutPageContentProps {
  content: AboutPageView;
}

export function AboutPageContentView({ content }: AboutPageContentProps) {
  const navItems = [
    content.identity ? { id: content.identity.id, label: "Ateliê" } : null,
    content.origin ? { id: content.origin.id, label: "Origem" } : null,
    content.practices ? { id: content.practices.id, label: "Práticas" } : null,
    content.territory ? { id: content.territory.id, label: "Território" } : null,
    content.luanda ? { id: content.luanda.id, label: "Luanda" } : null,
    content.complementary ? { id: "complementar", label: "Currículo" } : null,
  ].filter((item): item is { id: string; label: string } => item !== null);

  return (
    <>
      {navItems.length > 0 ? <AboutPageNav items={navItems} /> : null}

      <div className="mx-auto max-w-3xl space-y-20 px-6 py-12 sm:space-y-24 sm:py-16 md:px-10 md:py-24">
        {content.identity ? <AboutSection block={content.identity} /> : null}

        {content.origin || content.letter ? (
          <div className="space-y-12">
            {content.origin ? <AboutSection block={content.origin} /> : null}
            {content.letter ? <AboutLetterBlock letter={content.letter} /> : null}
          </div>
        ) : null}

        {content.practices ? (
          <AboutPractices
            id={content.practices.id}
            title={content.practices.title}
            intro={content.practices.intro}
            items={content.practices.items}
            note={content.practices.note}
          />
        ) : null}

        {content.territory ? <AboutSection block={content.territory} /> : null}
        {content.luanda ? <AboutSection block={content.luanda} /> : null}

        {content.complementary ? (
          <AboutComplementary
            title={content.complementary.title}
            sections={content.complementary.sections}
          />
        ) : null}

        {content.links.length > 0 ? <AboutLinks links={content.links} /> : null}
      </div>
    </>
  );
}
