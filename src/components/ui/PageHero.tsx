interface PageHeroProps {
  title: string;
  intro?: string;
  className?: string;
}

export function PageHero({ title, intro, className = "" }: PageHeroProps) {
  return (
    <header
      className={`mx-auto max-w-3xl px-6 py-12 md:px-10 md:py-20 lg:py-24 ${className}`}
    >
      <h1 className="font-display text-3xl leading-tight font-light tracking-wide text-balance sm:text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h1>
      {intro ? (
        <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-muted md:text-lg">
          {intro}
        </p>
      ) : null}
    </header>
  );
}
