interface TeamHeroProps {
  title: string;
  text: string;
}

export function TeamHero({ title, text }: TeamHeroProps) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24 lg:py-28">
        <div className="flex flex-col gap-8 md:gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h1 className="font-display text-5xl leading-none font-light tracking-wide sm:text-6xl md:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="max-w-sm whitespace-pre-line text-base leading-relaxed text-muted md:max-w-md md:text-lg lg:pb-1 lg:text-right">
            {text}
          </p>
        </div>
      </div>
    </header>
  );
}
