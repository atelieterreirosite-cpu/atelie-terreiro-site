interface PageHeroProps {
  title: string;
  kicker?: string;
  intro?: string;
  className?: string;
}

/**
 * Cabeçalho institucional alinhado ao eixo da página Sobre:
 * container max-w-5xl + padding compartilhado; título/intro à esquerda
 * com max-w-3xl apenas para conforto de leitura.
 */
export function PageHero({ title, kicker, intro, className = "" }: PageHeroProps) {
  return (
    <header className={className || undefined}>
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <div className="max-w-3xl">
          {kicker ? (
            <p className="mb-4 text-xs tracking-[0.15em] text-muted-light uppercase">{kicker}</p>
          ) : null}
          <h1 className="font-display text-xl leading-tight font-light tracking-wide text-balance sm:text-2xl md:text-3xl lg:text-4xl">
            {title}
          </h1>
          {intro ? (
            <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-muted md:text-lg">
              {intro}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
