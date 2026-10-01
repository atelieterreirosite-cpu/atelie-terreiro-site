import Image from "next/image";

const ABOUT_LOGO_SRC = "/images/logo_nome_icon.png";

interface AboutHeroProps {
  title: string;
  intro?: string;
}

export function AboutHero({ title, intro }: AboutHeroProps) {
  return (
    <header className="border-b border-border">
      {/*
        Mesmo eixo horizontal das seções em AboutPageContent
        (max-w-5xl + px-6 md:px-8 lg:px-10). Logo centralizada;
        título/intro à esquerda, com max-w-3xl só para leitura.
      */}
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <div className="mb-8 flex justify-center md:mb-10">
          <Image
            src={ABOUT_LOGO_SRC}
            alt="Logomarca Ateliê Terreiro"
            width={500}
            height={500}
            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
            className="h-auto w-48 sm:w-56 md:w-64"
            priority
          />
        </div>

        <div className="max-w-3xl">
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
