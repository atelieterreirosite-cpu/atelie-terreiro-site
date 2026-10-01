interface TeamHeroProps {
  title: string;
  text: string;
}

/**
 * Cabeçalho local da Equipe — espelha o eixo institucional (PageHero / Sobre)
 * sem alterar o componente compartilhado.
 */
export function TeamHero({ title, text }: TeamHeroProps) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <div className="max-w-3xl">
          <h1 className="font-display text-xl leading-tight font-light tracking-wide text-balance sm:text-2xl md:text-3xl lg:text-4xl">
            {title}
          </h1>
          <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-muted md:text-lg">
            {text}
          </p>
        </div>
      </div>
    </header>
  );
}
