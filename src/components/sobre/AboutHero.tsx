import Image from "next/image";

const ABOUT_LOGO_SRC = "/images/logo_Atelie_Terreiro_imagem_COR.png";
const ABOUT_LOGO_ALT = "Marca visual do Ateliê Terreiro";

interface AboutHeroProps {
  title: string;
  intro?: string;
}

export function AboutHero({ title, intro }: AboutHeroProps) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-12 md:px-10 md:py-20 lg:py-24">
        <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:items-center md:gap-10">
          <figure className="mx-auto w-full max-w-[10rem] shrink-0 sm:max-w-[11rem] md:mx-0 md:max-w-[9rem] lg:max-w-[10rem]">
            <Image
              src={ABOUT_LOGO_SRC}
              alt={ABOUT_LOGO_ALT}
              width={2026}
              height={2636}
              sizes="(max-width: 768px) 11rem, 10rem"
              className="h-auto w-full"
              priority
            />
          </figure>

          <div className="min-w-0 flex-1">
            <h1 className="font-display text-3xl leading-tight font-light tracking-wide text-balance sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h1>
            {intro ? (
              <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-muted md:text-lg">
                {intro}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
