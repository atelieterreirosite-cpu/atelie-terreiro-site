interface AboutHeroProps {
  title: string;
  intro?: string;
}

export function AboutHero({ title, intro }: AboutHeroProps) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-12 md:px-10 md:py-20 lg:py-24">
        <h1 className="font-display text-xl leading-tight font-light tracking-wide text-balance sm:text-2xl md:text-3xl lg:text-4xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-muted md:text-lg">
            {intro}
          </p>
        ) : null}
      </div>
    </header>
  );
}
